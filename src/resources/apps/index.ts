import { Base } from '../base';
import { Slot } from '../slots/types';
import { App, AppUpdate } from './types';

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
  // /slots
}