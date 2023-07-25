import { Base } from '../base';
import { App, AppUpdate } from './types';

export class Apps extends Base {
  getApp(id: string): Promise<App> {
    return this.request(`/app/info?appId=${id}`);
  }
  getApps(ids: string[]): Promise<App[]> {
    return this.request(`/app/info?appIds=${ids}`);
  }
  updateApp(update: AppUpdate): Promise<boolean> {
    return this.request('/app/update', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
  // /listings
  // /slots
}