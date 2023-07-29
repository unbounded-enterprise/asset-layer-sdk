import { Base } from './base';
import { App, GetAppProps, GetAppResponse, GetAppSlotsProps, GetAppSlotsResponse, GetAppsProps, GetAppsResponse } from '../types/app';
import { Slot } from '../types/slot';
import { BasicResult } from 'src/types/basic-types';
import { parseBasicError } from 'src/utils/basic-error';
import { propsToQueryString } from 'src/utils/basic-format';

export class Apps extends Base {
  getApp = async (props: GetAppProps): Promise<App> => {
    const response = await this.request<GetAppResponse>('/app/info' + propsToQueryString(props));
    
    return response.body.app;
  }
  getApps = async (props: GetAppsProps): Promise<App[]> => {
    const response = await this.request<GetAppsResponse>('/app/info'  + propsToQueryString(props));

    return response.body.app;
  }
  /* exists, not scoped
  updateApp(update: AppUpdate): Promise<boolean> {
    return this.request('/app/update', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
  */
  getAppSlots = async (props: GetAppSlotsProps): Promise<Slot[]> => {
    const response = await this.request<GetAppSlotsResponse>('/app/slots' + propsToQueryString(props));

    return response.body.app.slots;
  }

  safe = {
    getApp: async (props: GetAppProps): Promise<BasicResult<App>> => {
      try { return { result: await this.getApp(props) }; }
      catch (e) { return { error: parseBasicError(e) }; }
    },
    getApps: async (props: GetAppsProps): Promise<BasicResult<App[]>> => {
      try { return { result: await this.getApps(props) }; }
      catch (e) { return { error: parseBasicError(e) }; }
    },
    getAppSlots: async (props: GetAppSlotsProps): Promise<BasicResult<Slot[]>> => {
      try { return { result: await this.getAppSlots(props) }; }
      catch (e) { return { error: parseBasicError(e) }; }
    }
  }
}