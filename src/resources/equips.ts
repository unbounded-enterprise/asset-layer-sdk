import { GetEquipsProps, RawEquipsHandlers, RemoveEquipProps, SafeEquipsHandlers, SetEquipProps, SetEquipResponse } from 'src/types/equip';
import { Base } from './base';
import { propsToQueryString } from 'src/utils/basic-format';
import { parseBasicError } from 'src/utils/basic-error';

export class Equips extends Base {
  getEquips = async (props: GetEquipsProps) => { return (await this.raw.getEquips(props)).body.equip; }
  setEquip = async (props: SetEquipProps) => { return (await this.raw.setEquip(props)).body.equipId; }
  removeEquip = async (props: RemoveEquipProps) => { return (await this.raw.removeEquip(props)).success; }

  raw: RawEquipsHandlers = {
    getEquips: (props) => this.request('/equip/info' + propsToQueryString(props)),
    setEquip: (props) => this.request('/equip/new', { method: 'POST', body: JSON.stringify(props) }),
    removeEquip: (props) => this.request('/equip', { method: 'DELETE', body: JSON.stringify(props) }),
  };

  safe: SafeEquipsHandlers = {
    getEquips: async (props) => {
      try { return { result: await this.getEquips(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    setEquip: async (props) => {
      try { return { result: await this.setEquip(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    removeEquip: async (props) => {
      try { return { result: await this.removeEquip(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  }
}