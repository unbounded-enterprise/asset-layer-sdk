import { Base } from './base';
import { Slot } from '../types/slot';
import { App, AppUpdate } from '../types/app';
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
  getApp(id: string): Promise<App> {
    return this.request(`/app/info?appId=${id}`);
  }
  getApps(ids: string[]): Promise<App[]> {
    return this.request(`/app/info?appIds=${ids}`);
  }
  /* exists, not scoped
  updateApp(update: AppUpdate): Promise<boolean> {
    return this.request('/app/update', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
  */
  getSlots(id: string, idOnly: boolean = false): Promise<Slot[]> {
    return this.request(`/app/slots?appId=${id}&idOnly=${idOnly}`);
  }

  safe = {
    getApp: async (id: string): Promise<BasicResult<App>> => {
      try { return { result: await this.getApp(id) }; }
      catch (e) { return { error: parseBasicError(e) }; }
    }
  }
}