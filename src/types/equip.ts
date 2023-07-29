import { BasicResponse } from "./basic-types";

export type Equip = {
  
};

export type GetEquipProps = { nftId: string; handle: string; }
export type SetEquipResponse = BasicResponse<{ equipId: string; }>;

export type SetEquipProps = {
  slotId: string;
  nftIdParent: string;
  nftIdChild: string;
  handle: string;
}

export type RemoveEquipProps = { equipId: string; handle: string; }