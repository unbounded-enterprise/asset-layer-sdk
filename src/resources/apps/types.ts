export declare type AppStatus = 'active' | 'inactive';

export declare type App = {
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

export declare type AppUpdate = {
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