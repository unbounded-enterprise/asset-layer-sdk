import { Base } from './base';
import { propsToQueryString } from '../utils/basic-format';
import { parseBasicError } from '../utils/basic-error';
import { BuyItemProps, RawShopHandlers, SafeShopHandlers } from 'src/types/shop';

export class Shop extends Base {
  // newItem = async (props: NewItemProps, headers?: HeadersInit) => ((await this.raw.newItem(props, headers)).body.newItem);
  buyItem = async (props: BuyItemProps, headers?: HeadersInit) => ((await this.raw.buyItem(props, headers)).assetId);
  summary = async (headers?: HeadersInit) => ((await this.raw.summary(headers)).body.summary);
  // removeItem = async (props: RemoveItemProps, headers?: HeadersInit) => ((await this.raw.removeItem(props, headers)).success);

  raw: RawShopHandlers = {
    // newItem: async (props, headers) => this.request('/shop/newItem', { method: 'POST', body: JSON.stringify(props), headers }),
    buyItem: async (props, headers) => this.request('/shop/buy', { method: 'POST', body: JSON.stringify(props), headers }),
    summary: async (headers) => this.request('/shop/summary', { headers }),
    // removeItem: async (props, headers) => this.request('/shop/removeItem', { method: 'PUT', body: JSON.stringify(props), headers }),
  };

  safe: SafeShopHandlers = {
    // newItem: async (props, headers) => {
    //   try { return { result: await this.newItem(props, headers) }; }
    //   catch (e) { return { error: parseBasicError(e) }; } },
    buyItem: async (props, headers) => {
      try { return { result: await this.buyItem(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    summary: async (headers) => {
      try { return { result: await this.summary(headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    // removeItem: async (props, headers) => {
    //   try { return { result: await this.removeItem(props, headers) }; }
    //   catch (e) { return { error: parseBasicError(e) }; } },
  };
}