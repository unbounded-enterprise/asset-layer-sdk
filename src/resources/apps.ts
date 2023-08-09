import { Base } from './base';
import { App, GetAppProps, GetAppSlotsProps, GetAppsProps, RawAppsHandlers, SafeAppsHandlers } from '../types/app';
import { parseBasicError } from '../utils/basic-error';
import { propsToQueryString } from '../utils/basic-format';

export class Apps extends Base {
  getApp = async (props: GetAppProps, headers?: HeadersInit) => ((await this.raw.getApp(props, headers)).body.app);
  getApps = async (props: GetAppsProps, headers?: HeadersInit) => ((await this.raw.getApps(props, headers)).body.app);
  getAppSlots = async (props: GetAppSlotsProps, headers?: HeadersInit) => ((await this.raw.getAppSlots(props, headers)).body.app.slots);

  raw: RawAppsHandlers = {
    getApp: async (props, headers) => this.request('/app/info' + propsToQueryString(props), { headers }),
    getApps: async (props, headers) => this.request('/app/info'  + propsToQueryString(props), { headers }),
    getAppSlots: async (props, headers) => this.request('/app/slots' + propsToQueryString(props), { headers })
  };

  safe: SafeAppsHandlers = {
    getApp: async (props, headers) => {
      try { return { result: await this.getApp(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getApps: async (props, headers) => {
      try { return { result: await this.getApps(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppSlots: async (props, headers) => {
      try { return { result: await this.getAppSlots(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}