import type { SafeLoginHandlers, UserLoginProps } from './types/user';
import { Apps } from './resources/apps';
import { Assets } from './resources/assets';
import { Collections } from './resources/collections';
import { Equips } from './resources/equips';
import { Expressions } from './resources/expressions';
import { Listings } from './resources/listings';
import { Slots } from './resources/slots';
import { Users } from './resources/users';
import { Magic } from 'magic-sdk';
import assetlayerLoginEmail from './modules/assetlayer-login-email';
import { parseBasicError } from './utils/basic-error';

const magic = (typeof window !== 'undefined') ? new Magic('pk_live_8FB965353AF0A346') : undefined;
let lastTokenGenerated = 0;

export type AssetLayerConfig = {
  appSecret?: string;
  baseUrl?: string;
  initialize?: boolean;
}

export class AssetLayer {
  initialized: boolean;
  didToken: string;
  refreshSessionIID?: NodeJS.Timer;

  apps: Apps;
  assets: Assets;
  collections: Collections;
  equips: Equips;
  expressions: Expressions;
  listings: Listings;
  slots: Slots;
  users: Users;

  constructor(config?: AssetLayerConfig) {
    this.initialized = false;
    this.didToken = '';
    const parent = this;
    
    this.apps = new Apps(parent, config);
    this.assets = new Assets(parent, config);
    this.collections = new Collections(parent, config);
    this.equips = new Equips(parent, config);
    this.expressions = new Expressions(parent, config);
    this.listings = new Listings(parent, config);
    this.slots = new Slots(parent, config);
    this.users = new Users(parent, config);

    if (config?.initialize) this.initialize();
  }

  async initialize(setter?: (initialized: boolean) => void) {
    let loggedIn = false;
    const didToken = await this.getUserDidToken();
    if (didToken) loggedIn = !!(await this.loginUser({ didToken }));

    this.initialized = true;
    if (setter) setter(true);
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
    console.log('loginprops', props)
    if (!magic) return;
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
        console.log('otp!', otp);
        if (!otp) throw new Error('Login Failed [otp]: ' + parseBasicError(e1).message);

        const did = await magic!.user.generateIdToken({ lifespan: 3600, attachment: otp });
        console.log('did2!', did)
        const { result: userInfo, error: e2 } = await parent.users.safe.registerDid({ otp }, { didtoken: did });

        if (!userInfo) throw new Error('Login Failed [reg]: ' + parseBasicError(e2).message);

        lastTokenGenerated = Date.now();
        parent.didToken = did;
        if (!parent.initialized) parent.initialized = true;

        if (props?.callback) props.callback();

        async function refreshSessionHandler() {
          console.log('refresh time elapsed', Date.now() - lastTokenGenerated);
          if (Date.now() - lastTokenGenerated < 3000000) return;

          const { result: didToken } = await parent.safe.getUserDidToken();
          console.log('refresh did!', didToken);
          if (didToken) await parent.safe.loginUser({ didToken });
          else if (!((await parent.safe.isUserLoggedIn()).result)) parent.logoutUser();
        }
        parent.refreshSessionIID = setInterval(refreshSessionHandler, 300000);
        return true;
      }

      if (event) {
        if ((event.origin !== window.location.origin || event.data.source !== 'assetlayer-login-email-submission')) return false;

        window.removeEventListener('message', emailHandler);
        const frame = document.getElementById('assetlayer-login-iframe');
        if (frame) document.body.removeChild(frame);
      }
      else if (props?.didToken) {
        return await register(props.didToken);
      }
      else if (!props?.email) return false;
      
      const email = props?.email || event!.data.email;
      console.log('email!', email)
      
      const magicHandler = magic!.auth.loginWithEmailOTP({ email, /*showUI: props.showUI*/ });

      magicHandler
        .on('email-otp-sent', () => {
          const otp = window.prompt('Enter Email OTP');

          if (!otp) throw new Error('Invalid OTP');
      
          magicHandler.emit('verify-email-otp', otp);
        })
        .on('invalid-email-otp', () => {
          // magicHandler.emit('cancel');
        })
        .on('done', async (result) => {
          const didToken = result;
          console.log('did1!', didToken);
          if (!didToken) throw new Error('Invalid DID Token');

          await register(didToken);
        })
        .on('error', (reason) => {
          console.error(reason);
        })
        .on('settled', () => {
          
        }) 
        .catch((e) => {
          const error = parseBasicError(e);
          console.warn('login aborted:', error.message);
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
        console.warn('iFrame error');
      }
    }
  }
  async logoutUser() {
    if (!magic) return;

    try {
      await magic.user.logout();
    
      this.didToken = '';
      if (this.refreshSessionIID) clearInterval(this.refreshSessionIID);
    } catch {
      console.warn('logout err');
    }
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
  }
}

export * from './types/app';
export * from './types/asset';
export * from './types/basic-types';
export * from './types/collection';
export * from './types/equip';
export * from './types/expression';
export * from './types/listing';
export * from './types/slot';
export * from './types/user';