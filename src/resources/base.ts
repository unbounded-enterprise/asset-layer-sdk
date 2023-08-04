import fetch from 'isomorphic-unfetch';
import { BasicError } from 'src/types/basic-types';
import { UserLoginProps } from 'src/types/user';
import { Magic } from 'magic-sdk';

const assetlayerUrl = 'https://api-v2.assetlayer.com/api/v1';
const magic = new Magic('pk_live_D596D657B2C81119');

type Config = {
  baseUrl?: string;
  appSecret?: string;
  didToken?: string;
};

export abstract class Base {
  private baseUrl: string;
  private appSecret: string;
  private didToken: string;

  constructor(config: Config) {
    if (!config.appSecret) console.warn('No appSecret provided');

    this.baseUrl = config.baseUrl || assetlayerUrl;
    this.appSecret = config.appSecret || '';
    this.didToken = config.didToken || '';
  }

  async loginUser(props: UserLoginProps) {
    try {
      const magicHandler = magic.auth.loginWithEmailOTP({ email: props.email });

      magicHandler
        .on('done', (result: string | null) => {
          console.log('diddone', result);
          this.didToken = result || '';
        })
        .on('error', (reason: string) => {
          console.warn('[Magic]:', reason);
        })
    }
    catch (e) {
      console.warn('login err');
    }
  }
  async logoutUser() {
    try {
      await magic.user.logout();
    
      this.didToken = '';
    
    } catch {
      console.warn('logout err');
    }
  }

  protected request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'appsecret': this.appSecret,
      'didtoken': this.didToken,
      ...(options?.headers || {}),
    };
    const config = {
      ...options,
      headers,
    };

    return fetch(url, config).then(async (response) => {
      const body = await response.json();

      if (response.ok) return body;

      console.warn(`[AssetLayer@${endpoint.split('?')[0]}]: ${response.statusText} (${response.status}) // ${body?.message || 'Unknown Error'}`);
      throw new BasicError((body?.message || 'Unknown Error'), response.status);
    });
  }
}