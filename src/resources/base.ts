import fetch from 'isomorphic-unfetch';
import { AssetLayer } from '..';
import { BasicError } from '../types/basic-types';
import { parseBasicError } from '../utils/basic-error';

export const assetlayerUrl = 'https://api-v2.assetlayer.com/api/v1';

type AssetLayerHeaders = HeadersInit & {
  appsecret?: string;
  didtoken?: string;
};
type Config = {
  baseUrl?: string;
  appSecret?: string;
};

export abstract class Base {
  private parent: AssetLayer;
  private baseUrl: string;
  private appSecret: string;

  constructor(parent: AssetLayer, config?: Config) {
    this.parent = parent;
    this.baseUrl = config?.baseUrl || assetlayerUrl;
    this.appSecret = config?.appSecret || '';
  }

  protected request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: AssetLayerHeaders = {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    };
    if (!headers.appsecret && this.appSecret) headers.appsecret = this.appSecret;
    if (!headers.didtoken && this.parent.didToken) headers.didtoken = this.parent.didToken;

    const config = {
      ...options,
      headers,
    };

    return fetch(url, config).then(async (response) => {
      const body = await response.json();

      if (response.ok) return body;

      const error = parseBasicError(body);
      console.warn(`[AssetLayer@${endpoint.split('?')[0]}]: ${response.statusText} (${response.status}) // ${error.message}`);
      throw new BasicError((error.message), response.status);
    });
  }
}