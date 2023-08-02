import { Base } from './base';
import { App, GetAppProps, GetAppResponse, GetAppSlotsProps, GetAppSlotsResponse, GetAppsProps, GetAppsResponse } from '../types/app';
import { Slot } from '../types/slot';
import { BasicResult } from 'src/types/basic-types';
import { parseBasicError } from 'src/utils/basic-error';
import { propsToQueryString } from 'src/utils/basic-format';

export class Apps extends Base {
  getApp = async (props: GetAppProps): Promise<App> => ((await this.raw.getApp(props)).body.app);
  getApps = async (props: GetAppsProps): Promise<App[]> => ((await this.raw.getApps(props)).body.app);
  getAppSlots = async (props: GetAppSlotsProps): Promise<Slot[]> => ((await this.raw.getAppSlots(props)).body.app.slots);

  raw = {
    getApp: (props: GetAppProps) => this.request<GetAppResponse>('/app/info' + propsToQueryString(props)),
    getApps: (props: GetAppsProps) => this.request<GetAppsResponse>('/app/info'  + propsToQueryString(props)),
    getAppSlots: (props: GetAppSlotsProps) => this.request<GetAppSlotsResponse>('/app/slots' + propsToQueryString(props))
  };

  safe = {
    getApp: async (props: GetAppProps): Promise<BasicResult<App>> => {
      try { return { result: await this.getApp(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getApps: async (props: GetAppsProps): Promise<BasicResult<App[]>> => {
      try { return { result: await this.getApps(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppSlots: async (props: GetAppSlotsProps): Promise<BasicResult<Slot[]>> => {
      try { return { result: await this.getAppSlots(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}