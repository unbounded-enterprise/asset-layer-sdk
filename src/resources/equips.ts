import { SetEquipResponse } from 'src/types/equip';
import { Base } from './base';

type GetEquipProps = {
  nftId: string;
  handle: string;
}

type SetEquipProps = {
  slotId: string;
  nftIdParent: string;
  nftIdChild: string;
  handle: string;
}

type RemoveEquipProps = {
  equipId: string;
  handle: string;
}

export class Equips extends Base {
  info(props: GetEquipProps): Promise<unknown> {
    return this.request('/equip/info', {
      method: 'GET',
      body: JSON.stringify(props),
    });
  }
  equip = async (props: SetEquipProps): Promise<string> => {
    const response = await this.request<SetEquipResponse>('/equip/new', {
      method: 'POST',
      body: JSON.stringify(props),
    });

    return response.body.equipId;
  }
  unequip(props: RemoveEquipProps): Promise<unknown> {
    return this.request('/equip', {
      method: 'DELETE',
      body: JSON.stringify(props),
    });
  }
}