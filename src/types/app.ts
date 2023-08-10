import { BasicResponse, BasicResult } from "./basic-types";
import { Slot } from "./slot";
import { UserAlias } from "./user";

export type AppStatus = 'active' | 'inactive';
export type AppCurrency = {
    currencyId: string;
    currencyCode: string;
    name: string;
};

export type App = {
    appId: string;
    appName: string;
    appImage: string;
    appBanner: string;
    teamId: string;
    status: AppStatus;
    createdAt: number;
    updatedAt: number;
    slots: string[];
    appWallets: UserAlias[];
    appCurrencies: AppCurrency[];
    autoGrantRead?: boolean;
    description?: string;
    url?: string;
    handcashAppId?: string;
};

export type AppWithSlots = Omit<App, 'slots'> & {
    slots: Slot[];
};

export type UpdateAppProps = {
    appId: string;
    appName: string;
    appImage?: string;
    appBanner?: string;
    description?: string;
    url?: string;
    status?: AppStatus;
    autoGrantRead?: boolean;
    handcashAppId?: string;
}

export type GetAppProps = { appId: string; };
export type GetAppsProps = { appIds: string[]; };
export type GetAppSlotsProps = { appId: string; idOnly?: boolean; };

export type GetAppResponse = BasicResponse<{ app: App; }>;
export type GetAppsResponse = BasicResponse<{ app: App[]; }>;
export type GetAppSlotsResponse = BasicResponse<{ app: AppWithSlots; }>;
export type GetAppSlotIdsResponse = BasicResponse<{ app: App; }>;

export type RawAppsHandlers = {
    getApp: (props: GetAppProps, headers?: HeadersInit) => Promise<GetAppResponse>;
    getApps: (props: GetAppsProps, headers?: HeadersInit) => Promise<GetAppsResponse>;
    getAppSlots: (props: GetAppSlotsProps, headers?: HeadersInit) => Promise<GetAppSlotsResponse|GetAppSlotIdsResponse>;
};

export type SafeAppsHandlers = {
    getApp: (props: GetAppProps, headers?: HeadersInit) => Promise<BasicResult<App>>;
    getApps: (props: GetAppsProps, headers?: HeadersInit) => Promise<BasicResult<App[]>>;
    getAppSlots: (props: GetAppSlotsProps, headers?: HeadersInit) => Promise<BasicResult<Slot[]|string[]>>;
};