import { AssetLayerRequestOptions, Base } from './base';
import { propsToQueryString } from '../utils/basic-format';
import { parseBasicError } from '../utils/basic-error';
import { DecreaseCurrencyBalanceProps, GetCurrencyBalanceProps, GetCurrencyProps, GetCurrencySummaryProps, IncreaseCurrencyBalanceProps, RawCurrencyHandlers, SafeCurrencyHandlers, TransferCurrencyProps } from '../types/currency';

export class Currencies extends Base {
  info = async (props: GetCurrencyProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.info(props, headers, options)).body.currency);
  getCurrency = async (props: GetCurrencyProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getCurrency(props, headers, options)).body.currency);
  balance = async (props?: GetCurrencyBalanceProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.balance(props, headers, options)).body);
  getCurrencyBalance = async (props?: GetCurrencyBalanceProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getCurrencyBalance(props, headers, options)).body);
  getCurrencySummary = async (props: GetCurrencySummaryProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getCurrencySummary(props, headers, options)).body.currencies);
  increaseCurrencyBalance = async (props: IncreaseCurrencyBalanceProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.increaseCurrencyBalance(props, headers, options)).body.balance);
  decreaseCurrencyBalance = async (props: DecreaseCurrencyBalanceProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.decreaseCurrencyBalance(props, headers, options)).body.balance);
  transferCurrency = async (props: TransferCurrencyProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.transferCurrency(props, headers, options)).body.balance);

  raw: RawCurrencyHandlers = {
    info: async (props, headers, options) => this.request('/currency/info' + propsToQueryString(props), { headers }, options),
    getCurrency: async (props, headers, options) => this.request('/currency/info' + propsToQueryString(props), { headers }, options),
    balance: async (props, headers, options) => this.request('/currency/balance' + propsToQueryString(props), { headers }, options),
    getCurrencyBalance: async (props, headers, options) => this.request('/currency/balance' + propsToQueryString(props), { headers }, options),
    getCurrencySummary: async (props, headers, options) => this.request('/currency/summary' + propsToQueryString(props), { headers }, options),
    increaseCurrencyBalance: async (props, headers, options) => this.request('/currency/increaseBalance', { method: 'POST', body: JSON.stringify(props), headers }, options),
    decreaseCurrencyBalance: async (props, headers, options) => this.request('/currency/decreaseBalance', { method: 'POST', body: JSON.stringify(props), headers }, options),
    transferCurrency: async (props, headers, options) => this.request('/currency/transfer', { method: 'POST', body: JSON.stringify(props), headers }, options),
  };

  safe: SafeCurrencyHandlers = {
    info: async (props, headers, options) => {
      try { return { result: await this.info(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCurrency: async (props, headers, options) => {
      try { return { result: await this.getCurrency(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    balance: async (props, headers, options) => {
      try { return { result: await this.balance(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCurrencyBalance: async (props, headers, options) => {
      try { return { result: await this.getCurrencyBalance(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCurrencySummary: async (props, headers, options) => {
      try { return { result: await this.getCurrencySummary(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    increaseCurrencyBalance: async (props, headers, options) => {
      try { return { result: await this.increaseCurrencyBalance(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    decreaseCurrencyBalance: async (props, headers, options) => {
      try { return { result: await this.decreaseCurrencyBalance(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    transferCurrency: async (props, headers, options) => {
      try { return { result: await this.transferCurrency(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}