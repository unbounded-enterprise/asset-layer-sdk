import fetch from 'isomorphic-unfetch';

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

    return fetch(url, config).then((response:Response) => {
      console.log('fetched', url, config, response)
      if (response.ok) {
        console.log('fetch ok')
        return response.json();
      }

      const errorText = `[AssetLayer]: ${response.statusText}`;
      console.warn(errorText);
      throw new Error(errorText);
    });
  }
}