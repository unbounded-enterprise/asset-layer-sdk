import { AssetLayerRequestOptions } from "src/resources/base";
import { BasicResponse, BasicResult } from "./basic-types";

export type Currency = {
    currencyId: string;
    currencyCode: string;
    name?: string;
    currencyIcon?: string;
};
export type CurrencySummary = Currency & { totalIssued: number; owners: number; };
export type CurrencyWithBalance = Currency & { balance: number; };

export type GetCurrencyProps = { currencyId: string; };
export type GetCurrencyBalanceProps = { appId?: string; walletUserId?: string; };
export type GetCurrencySummaryProps = { appId: string; };
export type IncreaseCurrencyBalanceProps = { currencyId: string; amount: number; userId?: string; walletUserId?: string; };
export type DecreaseCurrencyBalanceProps = { currencyId: string; amount: number; userId?: string; walletUserId?: string; };
export type TransferCurrencyProps = { currencyId: string; amount: number; receiver: string; walletUserId?: string; };

export type RawCurrencyHandlers = {
    info: (props: GetCurrencyProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResponse<{ currency: Currency; }>>;
    getCurrency: (props: GetCurrencyProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResponse<{ currency: Currency; }>>;
    balance: (props?: GetCurrencyBalanceProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResponse<CurrencyWithBalance[]>>;
    getCurrencyBalance: (props?: GetCurrencyBalanceProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResponse<CurrencyWithBalance[]>>;
    getCurrencySummary: (props: GetCurrencySummaryProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResponse<{ currencies: CurrencySummary[]; }>>;
    increaseCurrencyBalance: (props: IncreaseCurrencyBalanceProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResponse<{ balance: number; }>>;
    decreaseCurrencyBalance: (props: DecreaseCurrencyBalanceProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResponse<{ balance: number; }>>;
    transferCurrency: (props: TransferCurrencyProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResponse<{ balance: number; }>>;
};

export type SafeCurrencyHandlers = {
    info: (props: GetCurrencyProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Currency>>;
    getCurrency: (props: GetCurrencyProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Currency>>;
    balance: (props?: GetCurrencyBalanceProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<CurrencyWithBalance[]>>;
    getCurrencyBalance: (props?: GetCurrencyBalanceProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<CurrencyWithBalance[]>>;
    getCurrencySummary: (props: GetCurrencySummaryProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<CurrencySummary[]>>;
    increaseCurrencyBalance: (props: IncreaseCurrencyBalanceProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<number>>;
    decreaseCurrencyBalance: (props: DecreaseCurrencyBalanceProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<number>>;
    transferCurrency: (props: TransferCurrencyProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<number>>;
};