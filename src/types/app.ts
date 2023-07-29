import { BasicResponse } from "./basic-types";
import { Slot } from "./slot";

export type AppStatus = 'active' | 'inactive';

export type App = {
    appId: string;
    handcashAppId: string;
    appName: string;
    appImage: string;
    teamId: string;
    handle: string;
    status: AppStatus;
    description: string;
    url: string;
    autoGrantRead: boolean;
    createdAt: number;
    updatedAt: number;
    slots: string[];
};

export type AppWithSlots = {
    appId: string;
    handcashAppId: string;
    appName: string;
    appImage: string;
    teamId: string;
    handle: string;
    status: AppStatus;
    description: string;
    url: string;
    autoGrantRead: boolean;
    createdAt: number;
    updatedAt: number;
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
export type GetAppsResponse = BasicResponse<{ app: App[]; }>;
export type GetAppSlotsProps = { appId: string; idOnly?: boolean; };
export type GetAppSlotsResponse = BasicResponse<{ app: AppWithSlots }>;