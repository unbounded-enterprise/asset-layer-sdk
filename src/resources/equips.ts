import { GetEquipsProps, RawEquipsHandlers, RemoveEquipProps, SafeEquipsHandlers, SetEquipProps, SetEquipResponse } from '../types/equip';
import { Base } from './base';
import { propsToQueryString } from '../utils/basic-format';
import { parseBasicError } from '../utils/basic-error';

export class Equips extends Base {
  getEquips = async (props: GetEquipsProps, headers?: HeadersInit) => { return (await this.raw.getEquips(props, headers)).body.equip; }
  setEquip = async (props: SetEquipProps, headers?: HeadersInit) => { return (await this.raw.setEquip(props, headers)).body.equipId; }
  removeEquip = async (props: RemoveEquipProps, headers?: HeadersInit) => { return (await this.raw.removeEquip(props, headers)).success; }

  raw: RawEquipsHandlers = {
    getEquips: async (props, headers) => this.request('/equip/info' + propsToQueryString(props), { headers }),
    setEquip: async (props, headers) => this.request('/equip/new', { method: 'POST', body: JSON.stringify(props), headers }),
    removeEquip: async (props, headers) => this.request('/equip', { method: 'DELETE', body: JSON.stringify(props), headers }),
  };

  safe: SafeEquipsHandlers = {
    getEquips: async (props, headers) => {
      try { return { result: await this.getEquips(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    setEquip: async (props, headers) => {
      try { return { result: await this.setEquip(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    removeEquip: async (props, headers) => {
      try { return { result: await this.removeEquip(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  }
}