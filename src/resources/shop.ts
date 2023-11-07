import type { BuyItemProps, RawShopHandlers, SafeShopHandlers } from '../types/shop';
import { AssetLayerRequestOptions, Base } from './base';
import { parseBasicError } from '../utils/basic-error';

export class Shop extends Base {
  // newItem = async (props: NewItemProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.newItem(props, headers, options)).body.newItem);
  buyItem = async (props: BuyItemProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.buyItem(props, headers, options)).body.assetId);
  summary = async (headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.summary(headers, options)).body.summary);
  // removeItem = async (props: RemoveItemProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.removeItem(props, headers, options)).success);

  raw: RawShopHandlers = {
    // newItem: async (props, headers, options) => this.request('/shop/newItem', { method: 'POST', body: JSON.stringify(props), headers }, options),
    buyItem: async (props, headers, options) => this.request('/shop/buy', { method: 'POST', body: JSON.stringify(props), headers }, options),
    summary: async (headers, options) => this.request('/shop/summary', { headers }, options),
    // removeItem: async (props, headers, options) => this.request('/shop/removeItem', { method: 'PUT', body: JSON.stringify(props), headers }, options),
  };

  safe: SafeShopHandlers = {
    // newItem: async (props, headers, options) => {
    //   try { return { result: await this.newItem(props, headers, options) }; }
    //   catch (e) { return { error: parseBasicError(e) }; } },
    buyItem: async (props, headers, options) => {
      try { return { result: await this.buyItem(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    summary: async (headers, options) => {
      try { return { result: await this.summary(headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    // removeItem: async (props, headers, options) => {
    //   try { return { result: await this.removeItem(props, headers, options) }; }
    //   catch (e) { return { error: parseBasicError(e) }; } },
  };
}