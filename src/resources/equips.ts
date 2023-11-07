import type { GetEquipsProps, RawEquipsHandlers, RemoveEquipProps, SafeEquipsHandlers, SetEquipProps } from '../types/equip';
import { AssetLayerRequestOptions, Base } from './base';
import { propsToQueryString } from '../utils/basic-format';
import { parseBasicError } from '../utils/basic-error';

export class Equips extends Base {
  getEquips = async (props: GetEquipsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.getEquips(props, headers, options)).body.equip; }
  setEquip = async (props: SetEquipProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.setEquip(props, headers, options)).body.equipId; }
  removeEquip = async (props: RemoveEquipProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.removeEquip(props, headers, options)).success; }

  raw: RawEquipsHandlers = {
    getEquips: async (props, headers, options) => this.request('/equip/info' + propsToQueryString(props), { headers }, options),
    setEquip: async (props, headers, options) => this.request('/equip/new', { method: 'POST', body: JSON.stringify(props), headers }, options),
    removeEquip: async (props, headers, options) => this.request('/equip', { method: 'DELETE', body: JSON.stringify(props), headers }, options),
  };

  safe: SafeEquipsHandlers = {
    getEquips: async (props, headers, options) => {
      try { return { result: await this.getEquips(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    setEquip: async (props, headers, options) => {
      try { return { result: await this.setEquip(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    removeEquip: async (props, headers, options) => {
      try { return { result: await this.removeEquip(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  }
}