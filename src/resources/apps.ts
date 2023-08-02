import { Base } from './base';
import { App, GetAppProps, GetAppSlotsProps, GetAppsProps, RawAppsHandlers, SafeAppsHandlers } from '../types/app';
import { parseBasicError } from 'src/utils/basic-error';
import { propsToQueryString } from 'src/utils/basic-format';

export class Apps extends Base {
  getApp = async (props: GetAppProps) => ((await this.raw.getApp(props)).body.app);
  getApps = async (props: GetAppsProps) => ((await this.raw.getApps(props)).body.app);
  getAppSlots = async (props: GetAppSlotsProps) => ((await this.raw.getAppSlots(props)).body.app.slots);

  raw: RawAppsHandlers = {
    getApp: async (props) => this.request('/app/info' + propsToQueryString(props)),
    getApps: async (props) => this.request('/app/info'  + propsToQueryString(props)),
    getAppSlots: async (props) => this.request('/app/slots' + propsToQueryString(props))
  };

  safe: SafeAppsHandlers = {
    getApp: async (props) => {
      try { return { result: await this.getApp(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getApps: async (props) => {
      try { return { result: await this.getApps(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppSlots: async (props) => {
      try { return { result: await this.getAppSlots(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}