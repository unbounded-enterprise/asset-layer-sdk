import { BasicResponse, BasicResult } from "./basic-types";
import { Slot } from "./slot";
import { UserAlias } from "./user";

export type AppStatus = 'active' | 'inactive';

export type App = {
    appId: string;
    handcashAppId: string;
    appName: string;
    appImage: string;
    appBanner: string;
    description: string;
    url: string;
    autoGrantRead: boolean;
    teamId: string;
    status: AppStatus;
    createdAt: number;
    updatedAt: number;
    slots: string[];
    appWallets: UserAlias[];
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
    getApp: (props: GetAppProps) => Promise<GetAppResponse>;
    getApps: (props: GetAppsProps) => Promise<GetAppsResponse>;
    getAppSlots: (props: GetAppSlotsProps) => Promise<GetAppSlotsResponse|GetAppSlotIdsResponse>;
};

export type SafeAppsHandlers = {
    getApp: (props: GetAppProps) => Promise<BasicResult<App>>;
    getApps: (props: GetAppsProps) => Promise<BasicResult<App[]>>;
    getAppSlots: (props: GetAppSlotsProps) => Promise<BasicResult<Slot[]|string[]>>;
};