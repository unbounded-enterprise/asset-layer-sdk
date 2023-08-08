import fetch from 'isomorphic-unfetch';
import { AssetLayer } from 'src';
import { BasicError } from 'src/types/basic-types';

const assetlayerUrl = 'https://api-v2.assetlayer.com/api/v1';

type Config = {
  baseUrl?: string;
  appSecret?: string;
};

export abstract class Base {
  private parent: AssetLayer;
  private baseUrl: string;
  private appSecret: string;

  constructor(config: Config, parent: AssetLayer) {
    this.parent = parent;
    this.baseUrl = config.baseUrl || assetlayerUrl;
    this.appSecret = config.appSecret || '';
  }

  protected request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'appsecret': this.appSecret,
      'didToken': this.parent.didToken,
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