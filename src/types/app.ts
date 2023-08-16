import type { BasicResponse, BasicResult } from "./basic-types";
import type { Slot, SlotWithExpressionsAndCollections } from "./slot";
import type { UserAlias } from "./user";

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
export type AppWithSlotsWithExpressionsAndCollections = Omit<App, 'slots'> & {
    slots: SlotWithExpressionsAndCollections[];
};
export type AppWithListingsCount = App & {
    count: number;
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
export type GetAppsAllProps = { appId?: string; appIds?: string[]; };
export type GetAppSlotsProps = { appId: string; };
export type GetAppSlotsAllProps = { appId: string; idOnly?: boolean; };
export type GetAppsWithListingsAllProps = { idOnly?: boolean; };

export type GetAppResponse = BasicResponse<{ app: App; }>;
export type GetAppsResponse = BasicResponse<{ app: App[]; }>;
export type GetAppSlotsResponse = BasicResponse<{ app: AppWithSlotsWithExpressionsAndCollections; }>;
export type GetAppSlotIdsResponse = BasicResponse<{ app: App; }>;
export type GetAppsWithListingsResponse = BasicResponse<{ apps: AppWithListingsCount[]; }>;
export type GetAppIdsWithListingsResponse = BasicResponse<{ apps: string[]; }>;

export type RawAppsHandlers = {
    info: (props: GetAppsAllProps, headers?: HeadersInit) => Promise<GetAppResponse|GetAppsResponse>;
    getApp: (props: GetAppProps, headers?: HeadersInit) => Promise<GetAppResponse>;
    getApps: (props: GetAppsProps, headers?: HeadersInit) => Promise<GetAppsResponse>;
    slots: (props: GetAppSlotsAllProps, headers?: HeadersInit) => Promise<GetAppSlotsResponse|GetAppSlotIdsResponse>;
    getAppSlots: (props: GetAppSlotsProps, headers?: HeadersInit) => Promise<GetAppSlotsResponse>;
    getAppSlotIds: (props: GetAppSlotsProps, headers?: HeadersInit) => Promise<GetAppSlotIdsResponse>;
    listings: (props: GetAppsWithListingsAllProps, headers?: HeadersInit) => Promise<GetAppsWithListingsResponse|GetAppIdsWithListingsResponse>;
    getAppsWithListings: (headers?: HeadersInit) => Promise<GetAppsWithListingsResponse>;
    getAppIdsWithListings: (headers?: HeadersInit) => Promise<GetAppIdsWithListingsResponse>;
};

export type SafeAppsHandlers = {
    info: (props: GetAppsAllProps, headers?: HeadersInit) => Promise<BasicResult<App|App[]>>;
    getApp: (props: GetAppProps, headers?: HeadersInit) => Promise<BasicResult<App>>;
    getApps: (props: GetAppsProps, headers?: HeadersInit) => Promise<BasicResult<App[]>>;
    slots: (props: GetAppSlotsAllProps, headers?: HeadersInit) => Promise<BasicResult<SlotWithExpressionsAndCollections[]|string[]>>;
    getAppSlots: (props: GetAppSlotsProps, headers?: HeadersInit) => Promise<BasicResult<SlotWithExpressionsAndCollections[]>>;
    getAppSlotIds: (props: GetAppSlotsProps, headers?: HeadersInit) => Promise<BasicResult<string[]>>;
    listings: (props: GetAppsWithListingsAllProps, headers?: HeadersInit) => Promise<BasicResult<App[]|string[]>>;
    getAppsWithListings: (headers?: HeadersInit) => Promise<BasicResult<App[]>>;
    getAppIdsWithListings: (headers?: HeadersInit) => Promise<BasicResult<string[]>>;
};