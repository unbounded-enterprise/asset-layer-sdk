import fetch from 'isomorphic-unfetch';
import { BasicError } from 'src/types/basic-types';

const assetlayerUrl = 'https://api.assetlayer.com/api/v1';

type Config = {
  baseUrl?: string;
  appSecret?: string;
  userToken?: string;
};

export abstract class Base {
  private baseUrl: string;
  private appSecret: string;
  private userToken: string;

  constructor(config: Config) {
    if (!config.appSecret && !config.userToken) console.warn('No appSecret or userToken provided');

    this.baseUrl = config.baseUrl || assetlayerUrl;
    this.appSecret = config.appSecret || '';
    this.userToken = config.userToken || '';
  }

  protected request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'appsecret': this.appSecret,
      'usertoken': this.userToken,
    };
    const config = {
      ...options,
      headers,
    };

    return fetch(url, config).then(async (response) => {
      console.log('fetched', url, config, response)
      const body = await response.json();

      if (response.ok) return body;

      console.warn(`[AssetLayer]: ${response.statusText} (${response.status}) // ${body?.message || 'Unknown Error'}`);
      throw new BasicError((body?.message || 'Unknown Error'), response.status);
    });
  }
}