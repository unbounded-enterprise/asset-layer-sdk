import { BasicResponse, BasicResult, BasicSuccessResponse } from "./basic-types";

export type Equip = {
  equipId: string;
  slotId: string;
  assetIdParent: string;
  assetIdChild: string;
};

export type GetEquipsProps = { assetId: string; handle: string; }
export type SetEquipResponse = BasicResponse<{ equipId: string; }>;

export type SetEquipProps = {
  slotId: string;
  nftIdParent: string;
  nftIdChild: string;
  handle: string;
}

export type RemoveEquipProps = { equipId: string; handle: string; }

export type RawEquipsHandlers = {
  getEquips: (props: GetEquipsProps) => Promise<BasicResponse<{ equip: Equip[]; }>>;
  setEquip: (props: SetEquipProps) => Promise<SetEquipResponse>;
  removeEquip: (props: RemoveEquipProps) => Promise<BasicSuccessResponse>;
};

export type SafeEquipsHandlers = {
  getEquips: (props: GetEquipsProps) => Promise<BasicResult<Equip[]>>;
  setEquip: (props: SetEquipProps) => Promise<BasicResult<string>>;
  removeEquip: (props: RemoveEquipProps) => Promise<BasicResult<boolean>>;
};
