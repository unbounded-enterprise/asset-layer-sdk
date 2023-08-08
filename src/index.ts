import { Apps } from './resources/apps';
import { Assets } from './resources/assets';
import { Collections } from './resources/collections';
import { Equips } from './resources/equips';
import { Expressions } from './resources/expressions';
import { Listings } from './resources/listings';
import { Slots } from './resources/slots';
import { Users } from './resources/users';
import { UserLoginProps } from 'src/types/user';
import { Magic } from 'magic-sdk';
import assetlayerLoginEmail from './modules/assetlayer-login-email';

const magic = (typeof window !== 'undefined') ? new Magic('pk_live_8FB965353AF0A346') : undefined;

export type AssetLayerConfig = {
  appSecret: string;
  baseUrl?: string;
}

export class AssetLayer {
  didToken: string;

  apps: Apps;
  assets: Assets;
  collections: Collections;
  equips: Equips;
  expressions: Expressions;
  listings: Listings;
  slots: Slots;
  users: Users;

  constructor(config: AssetLayerConfig) {
    this.didToken = '';
    const parent = this;
    
    this.apps = new Apps(config, parent);
    this.assets = new Assets(config, parent);
    this.collections = new Collections(config, parent);
    this.equips = new Equips(config, parent);
    this.expressions = new Expressions(config, parent);
    this.listings = new Listings(config, parent);
    this.slots = new Slots(config, parent);
    this.users = new Users(config, parent);
  }

  async loginUser(props: UserLoginProps) {
    if (!magic) return;
    const parent = this;

    function emailHandler(event?: MessageEvent) {
      if (event) {
        if ((event.origin !== window.location.origin || event.data.source !== 'assetlayer-login-email-submission')) return;
      }
      else if (!props.email) return;
      
      window.removeEventListener('message', emailHandler);
      const frame = document.getElementById('assetlayer-login-iframe');
      if (frame) document.body.removeChild(frame);
      
      const email = props.email || event!.data.email;
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
        .on('done', (result) => {
          const didToken = result;
          console.log('did1!', didToken);
          if (!didToken) throw new Error('Invalid DID Token');

          async function getOTP() {
            const { result: otp, error: e1 } = await parent.users.safe.getOTP({ didtoken: didToken! });

            if (!otp) throw new Error('Login Failed [otp]');

            const did = await magic!.user.generateIdToken({ lifespan: 3600, attachment: otp });
            console.log('did2!', did)
            const { result: userInfo, error: e2 } = await parent.users.safe.registerDid({ didtoken: did });

            if (!userInfo) throw new Error('Login Failed [reg]');

            parent.didToken = did;

            alert('Login complete!');
          }

          getOTP();
          // parent.didToken = didToken;
          // magic.user.logout();
        })
        .on('error', (reason) => {
          console.error(reason);
        })
        .on('settled', () => {
          
        }) 
        .catch((e) => {
          console.warn('login aborted');
        })
    }

    if (props.email) emailHandler(undefined);
    else {
      const iframe = document.createElement('iframe');
      iframe.id = 'assetlayer-login-iframe';
      iframe.style.position = 'absolute';
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
    
    } catch {
      console.warn('logout err');
    }
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