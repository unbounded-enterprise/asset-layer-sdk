import { AssetLayerRequestOptions } from "src/resources/base";
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
  getEquips: (props: GetEquipsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResponse<{ equip: Equip[]; }>>;
  setEquip: (props: SetEquipProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<SetEquipResponse>;
  removeEquip: (props: RemoveEquipProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicSuccessResponse>;
};

export type SafeEquipsHandlers = {
  getEquips: (props: GetEquipsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Equip[]>>;
  setEquip: (props: SetEquipProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<string>>;
  removeEquip: (props: RemoveEquipProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<boolean>>;
};
