import type { BasicConditionalBoolResult, BasicConditionalExtResult } from '../types/basic-types';
import type { GetAppProps, AppSlotsProps, GetAppSlotsProps, AppInfoProps, GetAppsProps, AppListingsProps, RawAppsHandlers, SafeAppsHandlers, App, GetAppResponse, GetAppsResponse, AppIdOnly, AppWithListingsCount } from '../types/app';
import type { SlotWithExpressions } from '../types/slot';
import { AssetLayerRequestOptions, Base } from './base';
import { parseBasicError } from '../utils/basic-error';
import { propsToQueryString } from '../utils/basic-format';

export class Apps extends Base {
  async info<T extends AppInfoProps> (props: T, headers?: HeadersInit, options?: AssetLayerRequestOptions): Promise<BasicConditionalExtResult<T, 'appIds', string[], App[], 'appId', string, App>>;
  async info<T extends AppInfoProps> (props: T, headers?: HeadersInit, options?: AssetLayerRequestOptions) { return ((await this.raw.info<T>(props, headers, options)).body.app); };
  getApp = async (props: GetAppProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getApp(props, headers, options)).body.app);
  getApps = async (props: GetAppsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getApps(props, headers, options)).body.app);
  async slots<T extends AppSlotsProps> (props: T, headers?: HeadersInit, options?: AssetLayerRequestOptions): Promise<BasicConditionalBoolResult<T, 'idOnly', string[], SlotWithExpressions[]>>;
  async slots<T extends AppSlotsProps> (props: T, headers?: HeadersInit, options?: AssetLayerRequestOptions) { return ((await this.raw.slots<T>(props, headers, options)).body.app.slots); };
  getAppSlots = async (props: GetAppSlotsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getAppSlots(props, headers, options)).body.app.slots);
  getAppSlotIds = async (props: GetAppSlotsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getAppSlotIds(props, headers, options)).body.app.slots);
  async listings<T extends AppListingsProps = {}> (props?: T, headers?: HeadersInit, options?: AssetLayerRequestOptions): Promise<BasicConditionalBoolResult<T, 'idOnly', AppIdOnly[], AppWithListingsCount[]>>;
  async listings<T extends AppListingsProps = {}> (props?: T, headers?: HeadersInit, options?: AssetLayerRequestOptions) { return ((await this.raw.listings<T>(props, headers, options)).body.apps); };
  getAppsWithListings = async (headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getAppsWithListings(headers, options)).body.apps);
  getAppIdsWithListings = async (headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getAppIdsWithListings(headers, options)).body.apps);

  raw: RawAppsHandlers = {
    info: async (props, headers, options) => this.request('/app/info' + propsToQueryString(props), { headers }, options),
    getApp: async (props, headers, options) => this.request('/app/info' + propsToQueryString(props), { headers }, options),
    getApps: async (props, headers, options) => this.request('/app/info'  + propsToQueryString(props), { headers }, options),
    slots: async (props, headers, options) => this.request('/app/slots' + propsToQueryString(props), { headers }, options),
    getAppSlots: async (props, headers, options) => this.request('/app/slots' + propsToQueryString(props), { headers }, options),
    getAppSlotIds: async (props, headers, options) => this.request('/app/slots' + propsToQueryString({ ...props, idOnly: true }), { headers }, options),
    listings: async (props, headers, options) => this.request('/app/listings' + propsToQueryString(props), { headers }, options),
    getAppsWithListings: async (headers, options) => this.request('/app/listings', { headers }, options),
    getAppIdsWithListings: async (headers, options) => this.request('/app/listings' + propsToQueryString({ idOnly: true }), { headers }, options),
  };

  safe: SafeAppsHandlers = {
    info: async (props, headers, options) => {
      try { return { result: await this.info(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getApp: async (props, headers, options) => {
      try { return { result: await this.getApp(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getApps: async (props, headers, options) => {
      try { return { result: await this.getApps(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    slots: async (props, headers, options) => {
      try { return { result: await this.slots(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppSlots: async (props, headers, options) => {
      try { return { result: await this.getAppSlots(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppSlotIds: async (props, headers, options) => {
      try { return { result: await this.getAppSlotIds(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    listings: async (props, headers, options) => {
      try { return { result: await this.listings(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppsWithListings: async (headers, options) => {
      try { return { result: await this.getAppsWithListings(headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppIdsWithListings: async (headers, options) => {
      try { return { result: await this.getAppIdsWithListings(headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}