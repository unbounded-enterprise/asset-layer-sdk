import type { GetAppProps, GetAppSlotsAllProps, GetAppSlotsProps, GetAppsAllProps, GetAppsProps, GetAppsWithListingsAllProps, RawAppsHandlers, SafeAppsHandlers } from '../types/app';
import { Base } from './base';
import { parseBasicError } from '../utils/basic-error';
import { propsToQueryString } from '../utils/basic-format';

export class Apps extends Base {
  info = async (props: GetAppsAllProps, headers?: HeadersInit) => ((await this.raw.info(props, headers)).body.app);
  getApp = async (props: GetAppProps, headers?: HeadersInit) => ((await this.raw.getApp(props, headers)).body.app);
  getApps = async (props: GetAppsProps, headers?: HeadersInit) => ((await this.raw.getApps(props, headers)).body.app);
  slots = async (props: GetAppSlotsAllProps, headers?: HeadersInit) => ((await this.raw.slots(props, headers)).body.app.slots);
  getAppSlots = async (props: GetAppSlotsProps, headers?: HeadersInit) => ((await this.raw.getAppSlots(props, headers)).body.app.slots);
  getAppSlotIds = async (props: GetAppSlotsProps, headers?: HeadersInit) => ((await this.raw.getAppSlotIds(props, headers)).body.app.slots);
  listings = async (props: GetAppsWithListingsAllProps, headers?: HeadersInit) => ((await this.raw.listings(props, headers)).body.apps);
  getAppsWithListings = async (headers?: HeadersInit) => ((await this.raw.getAppsWithListings(headers)).body.apps);
  getAppIdsWithListings = async (headers?: HeadersInit) => ((await this.raw.getAppIdsWithListings(headers)).body.apps);

  raw: RawAppsHandlers = {
    info: async (props, headers) => this.request('/app/info' + propsToQueryString(props), { headers }),
    getApp: async (props, headers) => this.request('/app/info' + propsToQueryString(props), { headers }),
    getApps: async (props, headers) => this.request('/app/info'  + propsToQueryString(props), { headers }),
    slots: async (props, headers) => this.request('/app/slots' + propsToQueryString(props), { headers }),
    getAppSlots: async (props, headers) => this.request('/app/slots' + propsToQueryString(props), { headers }),
    getAppSlotIds: async (props, headers) => this.request('/app/slots' + propsToQueryString({ ...props, idOnly: true }), { headers }),
    listings: async (props, headers) => this.request('/app/listings' + propsToQueryString(props), { headers }),
    getAppsWithListings: async (headers) => this.request('/app/listings', { headers }),
    getAppIdsWithListings: async (headers) => this.request('/app/listings' + propsToQueryString({ idOnly: true }), { headers }),
  };

  safe: SafeAppsHandlers = {
    info: async (props, headers) => {
      try { return { result: await this.info(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getApp: async (props, headers) => {
      try { return { result: await this.getApp(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getApps: async (props, headers) => {
      try { return { result: await this.getApps(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    slots: async (props, headers) => {
      try { return { result: await this.slots(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppSlots: async (props, headers) => {
      try { return { result: await this.getAppSlots(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppSlotIds: async (props, headers) => {
      try { return { result: await this.getAppSlotIds(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    listings: async (props, headers) => {
      try { return { result: await this.listings(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppsWithListings: async (headers) => {
      try { return { result: await this.getAppsWithListings(headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppIdsWithListings: async (headers) => {
      try { return { result: await this.getAppIdsWithListings(headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}