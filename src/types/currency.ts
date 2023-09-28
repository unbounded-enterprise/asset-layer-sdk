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
    info: (props: GetCurrencyProps, headers?: HeadersInit) => Promise<BasicResponse<{ currency: Currency; }>>;
    getCurrency: (props: GetCurrencyProps, headers?: HeadersInit) => Promise<BasicResponse<{ currency: Currency; }>>;
    balance: (props?: GetCurrencyBalanceProps, headers?: HeadersInit) => Promise<BasicResponse<CurrencyWithBalance[]>>;
    getCurrencyBalance: (props?: GetCurrencyBalanceProps, headers?: HeadersInit) => Promise<BasicResponse<CurrencyWithBalance[]>>;
    getCurrencySummary: (props: GetCurrencySummaryProps, headers?: HeadersInit) => Promise<BasicResponse<{ currencies: CurrencySummary[]; }>>;
    increaseCurrencyBalance: (props: IncreaseCurrencyBalanceProps, headers?: HeadersInit) => Promise<BasicResponse<{ balance: number; }>>;
    decreaseCurrencyBalance: (props: DecreaseCurrencyBalanceProps, headers?: HeadersInit) => Promise<BasicResponse<{ balance: number; }>>;
    transferCurrency: (props: TransferCurrencyProps, headers?: HeadersInit) => Promise<BasicResponse<{ balance: number; }>>;
};

export type SafeCurrencyHandlers = {
    info: (props: GetCurrencyProps, headers?: HeadersInit) => Promise<BasicResult<Currency>>;
    getCurrency: (props: GetCurrencyProps, headers?: HeadersInit) => Promise<BasicResult<Currency>>;
    balance: (props?: GetCurrencyBalanceProps, headers?: HeadersInit) => Promise<BasicResult<CurrencyWithBalance[]>>;
    getCurrencyBalance: (props?: GetCurrencyBalanceProps, headers?: HeadersInit) => Promise<BasicResult<CurrencyWithBalance[]>>;
    getCurrencySummary: (props: GetCurrencySummaryProps, headers?: HeadersInit) => Promise<BasicResult<CurrencySummary[]>>;
    increaseCurrencyBalance: (props: IncreaseCurrencyBalanceProps, headers?: HeadersInit) => Promise<BasicResult<number>>;
    decreaseCurrencyBalance: (props: DecreaseCurrencyBalanceProps, headers?: HeadersInit) => Promise<BasicResult<number>>;
    transferCurrency: (props: TransferCurrencyProps, headers?: HeadersInit) => Promise<BasicResult<number>>;
};