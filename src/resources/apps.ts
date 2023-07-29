import { Base } from './base';
import { Slot } from '../types/slot';
import { App, GetAppProps, GetAppSlotsProps, GetAppSlotsResponse, GetAppsProps, GetAppsResponse } from '../types/app';
import { BasicError, BasicResult } from 'src/types/basic-types';

export function parseBasicError(error:any, fallbackCode:number = 500): BasicError {
  if (!error) return new BasicError('Unknown Error', fallbackCode);

  const message = error.response?.data?.error || error.response?.data?.message || error.response?.data
    || error.data?.error || error.data?.message || error.data?.errorMessage || error.data || error.message || 'Unknown Error Message';
  const status = error.response?.data?.statusCode || error.response?.status
    || error.data?.status || error.data?.statusCode || error.status || fallbackCode;
  
  return new BasicError(message, status);
}

export class Apps extends Base {
  getApp = async (props: GetAppProps): Promise<App> => {
    const response = await this.request<GetAppsResponse>('/app/info', {
      method: 'GET',
      body: JSON.stringify(props),
    });

    return response.body.app[0];
  }
  getApps = async (props: GetAppsProps): Promise<App[]> => {
    const response = await this.request<GetAppsResponse>('/app/info', {
      method: 'GET',
      body: JSON.stringify(props),
    });

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
    const response = await this.request<GetAppSlotsResponse>('/app/slots', {
      method: 'GET',
      body: JSON.stringify(props),
    });

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