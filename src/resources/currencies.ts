import { Base } from './base';
import { propsToQueryString } from '../utils/basic-format';
import { parseBasicError } from '../utils/basic-error';
import { DecreaseCurrencyBalanceProps, GetCurrencyBalanceProps, GetCurrencyProps, GetCurrencySummaryProps, IncreaseCurrencyBalanceProps, RawCurrencyHandlers, SafeCurrencyHandlers, TransferCurrencyProps } from '../types/currency';

export class Currencies extends Base {
  info = async (props: GetCurrencyProps, headers?: HeadersInit) => ((await this.raw.info(props, headers)).body.currency);
  getCurrency = async (props: GetCurrencyProps, headers?: HeadersInit) => ((await this.raw.getCurrency(props, headers)).body.currency);
  balance = async (props?: GetCurrencyBalanceProps, headers?: HeadersInit) => ((await this.raw.balance(props, headers)).body);
  getCurrencyBalance = async (props?: GetCurrencyBalanceProps, headers?: HeadersInit) => ((await this.raw.getCurrencyBalance(props, headers)).body);
  getCurrencySummary = async (props: GetCurrencySummaryProps, headers?: HeadersInit) => ((await this.raw.getCurrencySummary(props, headers)).body);
  increaseCurrencyBalance = async (props: IncreaseCurrencyBalanceProps, headers?: HeadersInit) => ((await this.raw.increaseCurrencyBalance(props, headers)).body.balance);
  decreaseCurrencyBalance = async (props: DecreaseCurrencyBalanceProps, headers?: HeadersInit) => ((await this.raw.decreaseCurrencyBalance(props, headers)).body.balance);
  transferCurrency = async (props: TransferCurrencyProps, headers?: HeadersInit) => ((await this.raw.transferCurrency(props, headers)).body.balance);

  raw: RawCurrencyHandlers = {
    info: async (props, headers) => this.request('/currency/info' + propsToQueryString(props), { headers }),
    getCurrency: async (props, headers) => this.request('/currency/info' + propsToQueryString(props), { headers }),
    balance: async (props, headers) => this.request('/currency/balance' + propsToQueryString(props), { headers }),
    getCurrencyBalance: async (props, headers) => this.request('/currency/balance' + propsToQueryString(props), { headers }),
    getCurrencySummary: async (props, headers) => this.request('/currency/summary' + propsToQueryString(props), { headers }),
    increaseCurrencyBalance: async (props, headers) => this.request('/currency/increaseBalance', { method: 'POST', body: JSON.stringify(props), headers }),
    decreaseCurrencyBalance: async (props, headers) => this.request('/currency/decreaseBalance', { method: 'POST', body: JSON.stringify(props), headers }),
    transferCurrency: async (props, headers) => this.request('/currency/transfer', { method: 'POST', body: JSON.stringify(props), headers }),
  };

  safe: SafeCurrencyHandlers = {
    info: async (props, headers) => {
      try { return { result: await this.info(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCurrency: async (props, headers) => {
      try { return { result: await this.getCurrency(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    balance: async (props, headers) => {
      try { return { result: await this.balance(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCurrencyBalance: async (props, headers) => {
      try { return { result: await this.getCurrencyBalance(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCurrencySummary: async (props, headers) => {
      try { return { result: await this.getCurrencySummary(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    increaseCurrencyBalance: async (props, headers) => {
      try { return { result: await this.increaseCurrencyBalance(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    decreaseCurrencyBalance: async (props, headers) => {
      try { return { result: await this.decreaseCurrencyBalance(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    transferCurrency: async (props, headers) => {
      try { return { result: await this.transferCurrency(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}