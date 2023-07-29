import { GetEquipProps, RemoveEquipProps, SetEquipProps, SetEquipResponse } from 'src/types/equip';
import { Base } from './base';

export class Equips extends Base {
  getEquip(props: GetEquipProps): Promise<unknown> {
    return this.request('/equip/info', {
      method: 'GET',
      body: JSON.stringify(props),
    });
  }
  setEquip = async (props: SetEquipProps): Promise<string> => {
    const response = await this.request<SetEquipResponse>('/equip/new', {
      method: 'POST',
      body: JSON.stringify(props),
    });

    return response.body.equipId;
  }
  removeEquip(props: RemoveEquipProps): Promise<unknown> {
    return this.request('/equip', {
      method: 'DELETE',
      body: JSON.stringify(props),
    });
  }
}