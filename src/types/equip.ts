import type { BasicResponse, BasicResult, BasicSuccessResponse } from "./basic-types";

export type Equip = {
  equipId: string;
  slotId: string;
  assetIdParent: string;
  assetIdChild: string;
};

export type GetEquipsProps = { assetId: string; };
export type SetEquipResponse = BasicResponse<{ equipId: string; }>;

export type SetEquipProps = {
  slotId: string;
  assetIdParent: string;
  assetIdChild: string;
}

export type RemoveEquipProps = { equipId: string; };

export type RawEquipsHandlers = {
  getEquips: (props: GetEquipsProps, headers?: HeadersInit) => Promise<BasicResponse<{ equip: Equip[]; }>>;
  setEquip: (props: SetEquipProps, headers?: HeadersInit) => Promise<SetEquipResponse>;
  removeEquip: (props: RemoveEquipProps, headers?: HeadersInit) => Promise<BasicSuccessResponse>;
};

export type SafeEquipsHandlers = {
  getEquips: (props: GetEquipsProps, headers?: HeadersInit) => Promise<BasicResult<Equip[]>>;
  setEquip: (props: SetEquipProps, headers?: HeadersInit) => Promise<BasicResult<string>>;
  removeEquip: (props: RemoveEquipProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
};
