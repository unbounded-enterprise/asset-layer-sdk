import fetch from 'isomorphic-unfetch';
import { BasicError } from 'src/types/basic-types';
import { UserLoginProps } from 'src/types/user';

const assetlayerUrl = 'https://api-v2.assetlayer.com/api/v1';

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

  protected loginUser(props: UserLoginProps) {
    this.didToken = props.didToken;
  }
  protected logoutUser() {
    this.didToken = '';
  }

  protected request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'appsecret': this.appSecret,
      'didtoken': this.didToken,
    };
    const config = {
      ...options,
      headers,
    };

    return fetch(url, config).then(async (response) => {
      const body = await response.json();

      if (response.ok) return body;

      console.warn(`[AssetLayer@${endpoint}]: ${response.statusText} (${response.status}) // ${body?.message || 'Unknown Error'}`);
      throw new BasicError((body?.message || 'Unknown Error'), response.status);
    });
  }
}