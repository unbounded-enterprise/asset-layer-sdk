import type { NewRegisteredDidTokenProps, SafeLoginHandlers, UserLoginProps } from './types/user';
import { Apps } from './resources/apps';
import { Assets } from './resources/assets';
import { Collections } from './resources/collections';
import { Equips } from './resources/equips';
import { Expressions } from './resources/expressions';
import { Listings } from './resources/listings';
import { Shop } from './resources/shop';
import { Slots } from './resources/slots';
import { Users } from './resources/users';
import { Magic } from 'magic-sdk';
import assetlayerLoginEmail from './modules/assetlayer-login-email';
import { parseBasicError } from './utils/basic-error';
import { Currencies } from './resources/currencies';
import AssetLayerSessionTokenManager from './resources/sessions';

const magic = (typeof window !== 'undefined') ? new Magic('pk_live_8FB965353AF0A346') : undefined;
const defaultLifespan = 86400;
let lastTokenGenerated = 0;

export type AssetLayerConfig = {
  initialize?: boolean;
  baseUrl?: string;
  appSecret?: string;
  didToken?: string;
  logs?: boolean;
  sessionCache?: boolean;
}

export class AssetLayer {
  initialized: boolean;
  didToken: string;
  logs: boolean;
  sessionCache: boolean;
  refreshSessionTID?: ReturnType<typeof setTimeout>;

  apps: Apps;
  assets: Assets;
  collections: Collections;
  currencies: Currencies;
  equips: Equips;
  expressions: Expressions;
  listings: Listings;
  shop: Shop;
  slots: Slots;
  users: Users;

  constructor(config?: AssetLayerConfig) {
    this.initialized = false;
    this.didToken = config?.didToken || '';
    this.logs = config?.logs || false;
    this.sessionCache = (typeof config?.sessionCache === 'boolean') ? config.sessionCache : true;
    const parent = this;
    
    this.apps = new Apps(parent, config);
    this.assets = new Assets(parent, config);
    this.collections = new Collections(parent, config);
    this.currencies = new Currencies(parent, config);
    this.equips = new Equips(parent, config);
    this.expressions = new Expressions(parent, config);
    this.listings = new Listings(parent, config);
    this.shop = new Shop(parent, config);
    this.slots = new Slots(parent, config);
    this.users = new Users(parent, config);

    if (config?.initialize) this.initialize();
  }

  async initialize(onComplete?: (loggedIn: boolean) => void) {
    let loggedIn = false;

    const cachedToken = (this.sessionCache) ? AssetLayerSessionTokenManager.get() : undefined;
    if (cachedToken) loggedIn = !!(await this.loginUser({ registeredDidToken: cachedToken, disableCaching: true }));

    if (!loggedIn) {
      const didToken = await this.getUserDidToken();
      if (didToken) loggedIn = !!(await this.loginUser({ didToken }));
    }

    this.initialized = true;
    if (onComplete) onComplete(loggedIn);
    return loggedIn;
  }

  async isUserLoggedIn() {
    if (!magic) return undefined;

    const isLoggedIn = await magic.user.isLoggedIn();
    
    return isLoggedIn;
  }

  async getUserDidToken() {
    if (!(await this.isUserLoggedIn())) return undefined;

    const didToken = await magic!.user.getIdToken();

    return didToken;
  }

  async getUserMetadata() {
    if (!magic) return undefined;
    if (!(await this.isUserLoggedIn())) return undefined;

    const userMetadata = await magic.user.getMetadata();

    return userMetadata;
  }

  async loginUser(props?: UserLoginProps) {
    if (this.logs) console.log('login props:', props)
    if (props?.registeredDidToken) {
      this.didToken = props.registeredDidToken;
      if (this.sessionCache && !props.disableCaching) {
        AssetLayerSessionTokenManager.set(props.registeredDidToken, Date.now() - 300000);
      }
      this.initialized = true;
      if (props?.onSuccess) props.onSuccess();
      if (props?.onComplete) props.onComplete(true);
      return true;
    }
    if (!magic) return false;
    if (!props || !(props.email || props.didToken)) {
      const didToken = await this.getUserDidToken();
      if (didToken) {
        if (!props) props = { didToken };
        else props.didToken = didToken;
      }
    }
    const parent = this;

    async function emailHandler(event?: MessageEvent) {
      async function register(token: string) {
        const { result: otp, error: e1 } = await parent.users.safe.getOTP({ didtoken: token! });
        if (parent.logs) console.log('pre-registered did:', otp);
        if (!otp) {
          const message = 'Login Failed [OTP]: ' + parseBasicError(e1).message;
          console.warn(message);
          if (props?.onError) props.onError(message);
          if (props?.onComplete) props.onComplete(false);
          return false;
        }

        const did = await magic!.user.generateIdToken({ lifespan: 86400, attachment: otp });
        if (parent.logs) console.log('registered did:', did)
        const tokenTimestamp = Date.now();
        const { result: userInfo, error: e2 } = await parent.users.safe.registerDid({ otp }, { didtoken: did });

        if (!userInfo) {
          const message = 'Login Failed [Reg]: ' + parseBasicError(e2).message;
          console.warn(message);
          if (props?.onError) props.onError(message);
          if (props?.onComplete) props.onComplete(false);
          return false;
        }

        if (parent.sessionCache) AssetLayerSessionTokenManager.set(did, tokenTimestamp);
        lastTokenGenerated = tokenTimestamp;
        parent.didToken = did;
        if (!parent.initialized) parent.initialized = true;

        if (props?.onSuccess) props.onSuccess();
        if (props?.onComplete) props.onComplete(true);

        if (!parent.refreshSessionTID) {
          async function refreshSessionHandler() {
            if (parent.logs) console.log('login refresh time elapsed', Date.now() - lastTokenGenerated);
            if (Date.now() - lastTokenGenerated < 1000 * 60 * 60 * 23) {
              parent.refreshSessionTID = setTimeout(refreshSessionHandler, 900000);
              return;
            }
  
            const { result: didToken } = await parent.safe.getUserDidToken();
            if (parent.logs) console.log('refreshed did:', didToken);
            if (didToken) {
              await parent.safe.loginUser({ didToken });
              parent.refreshSessionTID = setTimeout(refreshSessionHandler, 300000);
            }
            else if (!((await parent.safe.isUserLoggedIn()).result)) parent.logoutUser();
          }

          parent.refreshSessionTID = setTimeout(refreshSessionHandler, 3600000);
        }

        return true;
      }

      if (event) {
        if ((event.origin !== window.location.origin || event.data.source !== 'assetlayer-login-popup')) return false;

        window.removeEventListener('message', emailHandler);
        const frame = document.getElementById('assetlayer-login-iframe');
        if (frame) document.body.removeChild(frame);

        if (!(event.data.type === 'submit')) {
          if (props?.onComplete) props.onComplete(false);
          return false;
        }
      }
      else if (!props) return false;
      else if (props.didToken) {
        return await register(props.didToken);
      }
      else if (!props.email) {
        if (props?.onComplete) props.onComplete(false);
        return false;
      }
      
      const email = props?.email || event!.data.email;
      const magicHandler = magic!.auth.loginWithEmailOTP({ email, /*showUI: props.showUI*/ });

      magicHandler
        .on('email-otp-sent', () => {
          const otp = window.prompt('Enter Email OTP');

          if (!otp) console.warn('Invalid OTP');
          else magicHandler.emit('verify-email-otp', otp);
        })
        .on('invalid-email-otp', () => {
          // magicHandler.emit('cancel');
        })
        .on('done', async (result) => {
          const didToken = result;
          
          if (!didToken) {
            const message = 'Invalid DID Token';
            console.warn('login aborted:', message);
            if (props?.onError) props.onError(message);
            if (props?.onComplete) props.onComplete(false);
          }
          else await register(didToken);
        })
        .on('error', (reason) => {
          console.error(reason);
        })
        .on('settled', () => {
          
        }) 
        .catch((e) => {
          const error = parseBasicError(e);
          console.warn('login aborted:', error.message);
          if (props?.onError) props.onError(error.message);
          if (props?.onComplete) props.onComplete(false);
        })
    }

    if (props && (props.email || props.didToken)) return await emailHandler(undefined);
    else {
      const iframe = document.createElement('iframe');
      iframe.id = 'assetlayer-login-iframe';
      iframe.style.position = 'absolute';
      iframe.style.left = '0px';
      iframe.style.top = '0px';
      iframe.style.width = '100vw';
      iframe.style.height = '100vh';
      document.body.appendChild(iframe);

      try {
        const doc = iframe.contentWindow?.document || iframe.contentDocument;
        if (!doc) throw new Error('err');
        
        doc.open();
        doc.write(assetlayerLoginEmail);
        doc.close();

        window.addEventListener('message', emailHandler);
      }
      catch (e) {
        const message = 'iFrame error';
        console.warn(message);
        if (props?.onError) props.onError(message);
        if (props?.onComplete) props.onComplete(false);
      }
    }
  }
  async logoutUser() {
    if (!magic) return;

    try {
      await magic.user.logout();
      
      this.didToken = '';
      AssetLayerSessionTokenManager.del();
      if (this.refreshSessionTID) {
        clearTimeout(this.refreshSessionTID);
        this.refreshSessionTID = undefined;
      }
    } catch {
      console.warn('logout err');
    }
  }

  async newRegisteredDidToken(props?: NewRegisteredDidTokenProps, headers?: HeadersInit) {
    const didtoken = await this.getUserDidToken();
    if (!didtoken) return undefined;

    const h1 = (headers) ? { ...headers, didtoken } : { didtoken };
    const { result: otp, error: e1 } = await this.users.safe.getOTP(h1);
    if (!otp) {
      const message = 'Register Failed [OTP]: ' + parseBasicError(e1).message;
      console.warn(message);
      return undefined;
    }

    const did = await magic!.user.generateIdToken({ lifespan: defaultLifespan, attachment: otp });
    const h2 = (headers) ? { ...headers, didtoken: did } : { didtoken: did };
    const { result: userInfo, error: e2 } = await this.users.safe.registerDid({ otp }, h2);

    if (!userInfo) {
      const message = 'Register Failed [Reg]: ' + parseBasicError(e2).message;
      console.warn(message);
      return undefined;
    }

    return did;
  }

  safe: SafeLoginHandlers = {
    initialize: async (setter) => {
      try { return { result: await this.initialize(setter) } }
      catch (e) { return { error: parseBasicError(e) } } },
    isUserLoggedIn: async () => {
      try { return { result: await this.isUserLoggedIn() } }
      catch (e) { return { error: parseBasicError(e) } } },
    getUserDidToken: async () => {
      try { return { result: await this.getUserDidToken() } }
      catch (e) { return { error: parseBasicError(e) } } },
    getUserMetadata: async () => {
      try { return { result: await this.getUserMetadata() } }
      catch (e) { return { error: parseBasicError(e) } } },
    loginUser: async (props) => {
      try { return { result: await this.loginUser(props) } }
      catch (e) { return { error: parseBasicError(e) } } },
    logoutUser: async () => {
      try { return { result: await this.logoutUser() } }
      catch (e) { return { error: parseBasicError(e) } } },
    newRegisteredDidToken: async (props) => {
      try { return { result: await this.newRegisteredDidToken(props) } }
      catch (e) { return { error: parseBasicError(e) } } },
  }
}

export * from './types/app';
export * from './types/asset';
export * from './types/basic-types';
export * from './types/collection';
export * from './types/currency';
export * from './types/equip';
export * from './types/expression';
export * from './types/listing';
export * from './types/shop';
export * from './types/slot';
export * from './types/user';