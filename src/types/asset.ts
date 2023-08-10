import { BasicAnyObject, BasicResponse, BasicResult, BasicSuccessResponse } from "../types/basic-types";
import { BulkExpressionValueLog, ExpressionValue, UpdateAssetExpressionValueProps, UpdateAssetExpressionValueResponse, UpdateAssetsExpressionValueProps, UpdateAssetsExpressionValueResponse, UpdateBulkExpressionValuesProps, UpdateCollectionAssetsExpressionValueProps, UpdateExpressionValuesProps } from "./expression";
import { UserAlias } from "./user";

export type Asset = {
    assetId: string;
    serial: number;
    collectionId: string;
    collectionName: string;
    user: UserAlias;
    createdAt: number;
    updatedAt: number;
    expressionValues: ExpressionValue[];
    properties: BasicAnyObject;
};

export type GetAssetProps = { assetId: string; }
export type GetAssetsProps = { assetIds: string[]; }

export type GetUserAssetsProps = {
    walletUserId?: string;
    idOnly?: boolean; 
    countsOnly?: boolean; 
}

export type GetUserCollectionAssetsProps = {
    collectionId: string;
    walletUserId?: string;
    serials?: string;
    range?: string;
    idOnly?: boolean;
    countsOnly?: boolean;
}

export type GetUserCollectionsAssetsProps = {
    collectionIds: string[];
    walletUserId?: string;
    idOnly?: boolean;
    countsOnly?: boolean;
}

export type GetUserSlotAssetsProps = {
    slotId: string;
    walletUserId?: string;
    idOnly?: boolean;
    countsOnly?: boolean;
}

export type GetUserSlotsAssetsProps = {
    slotIds: string[];
    walletUserId?: string;
    includeDeactivated?: boolean;
    idOnly?: boolean;
    countsOnly?: boolean;
}

export type MintAssetsProps = {
    collectionId: string;
    number: number;
    walletUserId?: string;
    mintTo?: string;
}

type SendAssetBase = { receiver: string; walletUserId?: string; };
export type SendAssetProps = SendAssetBase & { assetId: string; };
export type SendAssetsProps = SendAssetBase & { assetIds: string[]; };
export type SendCollectionAssetsProps = SendAssetBase & { collectionId: string; };
export type SendAssetAllProps = SendAssetBase & { assetId?: string; assetIds?: string[]; collectionId?: string; };

export type SendLowestAssetProps = {
    receiver: string;
    collectionId: string;
    walletUserId?: string;
}

export type SendRandomAssetProps = {
    receiver: string;
    collectionId: string;
    walletUserId?: string;
}

export type UpdateAssetProps = {
    assetId: string;
    properties: BasicAnyObject;
}

export type UpdateAssetsProps = {
    assetIds: string[];
    properties: BasicAnyObject;
}

export type UpdateCollectionAssetsProps = {
    collectionId: string;
    properties: BasicAnyObject;
}

export type AssetCounts = { [collectionId: string]: number };
export type SendAssetResponseBody = { to: string; serial: number; assetId: string; };
export type SendAssetsResponseBody = { to: string; assetIds: string[]; };

export type GetAssetsResponse = BasicResponse<{ assets: Asset[]; }>;
export type GetAssetIdsResponse = BasicResponse<{ assets: string[]; }>;
export type GetAssetCountsResponse = BasicResponse<{ assets: AssetCounts }>;
export type SendAssetResponse = BasicResponse<SendAssetResponseBody>;
export type SendAssetsResponse = BasicResponse<SendAssetsResponseBody>;
export type UpdateAssetResponse = BasicResponse<{ assetId: string; serial: number; }>;
export type UpdateAssetsResponse = BasicResponse<{ assetIds: string[]; }>;
export type UpdateCollectionAssetsResponse = BasicResponse<{ collectionId: string; }>;

export type RawAssetsHandlers = {
    getAsset: (props: GetAssetProps, headers?: HeadersInit) => Promise<GetAssetsResponse>;
    getAssets: (props: GetAssetsProps, headers?: HeadersInit) => Promise<GetAssetsResponse>;
    getUserAssets: (props: GetUserAssetsProps, headers?: HeadersInit) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    getUserCollectionAssets: (props: GetUserCollectionAssetsProps, headers?: HeadersInit) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    getUserCollectionsAssets: (props: GetUserCollectionsAssetsProps, headers?: HeadersInit) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    getUserSlotAssets: (props: GetUserSlotAssetsProps, headers?: HeadersInit) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    getUserSlotsAssets: (props: GetUserSlotsAssetsProps, headers?: HeadersInit) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    mintAssets: (props: MintAssetsProps, headers?: HeadersInit) => Promise<BasicSuccessResponse>;
    send: (props: SendAssetAllProps, headers?: HeadersInit) => Promise<SendAssetResponse|SendAssetsResponse>;
    sendAsset: (props: SendAssetProps, headers?: HeadersInit) => Promise<SendAssetResponse>;
    sendAssets: (props: SendAssetsProps, headers?: HeadersInit) => Promise<SendAssetsResponse>;
    sendCollectionAssets: (props: SendCollectionAssetsProps, headers?: HeadersInit) => Promise<SendAssetsResponse>;
    sendLowestAsset: (props: SendLowestAssetProps, headers?: HeadersInit) => Promise<SendAssetResponse>;
    sendRandomAsset: (props: SendRandomAssetProps, headers?: HeadersInit) => Promise<SendAssetResponse>;
    updateAsset: (props: UpdateAssetProps, headers?: HeadersInit) => Promise<UpdateAssetResponse>;
    updateAssets: (props: UpdateAssetsProps, headers?: HeadersInit) => Promise<UpdateAssetsResponse>;
    updateCollectionAssets: (props: UpdateCollectionAssetsProps, headers?: HeadersInit) => Promise<UpdateCollectionAssetsResponse>;

    updateExpressionValues: (props: UpdateExpressionValuesProps, headers?: HeadersInit) => Promise<UpdateAssetExpressionValueResponse|UpdateAssetsExpressionValueResponse|BasicSuccessResponse>;
    updateAssetExpressionValue: (props: UpdateAssetExpressionValueProps, headers?: HeadersInit) => Promise<UpdateAssetExpressionValueResponse>;
    updateAssetsExpressionValue: (props: UpdateAssetsExpressionValueProps, headers?: HeadersInit) => Promise<UpdateAssetsExpressionValueResponse>;
    updateCollectionAssetsExpressionValue: (props: UpdateCollectionAssetsExpressionValueProps, headers?: HeadersInit) => Promise<BasicSuccessResponse>;
    updateBulkExpressionValues: (props: UpdateBulkExpressionValuesProps, headers?: HeadersInit) => Promise<BasicResponse<{ log: BulkExpressionValueLog[]; }>>;
};

export type SafeAssetsHandlers = {
    getAsset: (props: GetAssetProps, headers?: HeadersInit) => Promise<BasicResult<Asset>>;
    getAssets: (props: GetAssetsProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]>>;
    getUserAssets: (props: GetUserAssetsProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]|string[]|AssetCounts>>;
    getUserCollectionAssets: (props: GetUserCollectionAssetsProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]|string[]|AssetCounts>>;
    getUserCollectionsAssets: (props: GetUserCollectionsAssetsProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]|string[]|AssetCounts>>;
    getUserSlotAssets: (props: GetUserSlotAssetsProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]|string[]|AssetCounts>>;
    getUserSlotsAssets: (props: GetUserSlotsAssetsProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]|string[]|AssetCounts>>;
    mintAssets: (props: MintAssetsProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    send: (props: SendAssetAllProps, headers?: HeadersInit) => Promise<BasicResult<SendAssetResponseBody|SendAssetsResponseBody>>;
    sendAsset: (props: SendAssetProps, headers?: HeadersInit) => Promise<BasicResult<SendAssetResponseBody>>;
    sendAssets: (props: SendAssetsProps, headers?: HeadersInit) => Promise<BasicResult<SendAssetsResponseBody>>;
    sendCollectionAssets: (props: SendCollectionAssetsProps, headers?: HeadersInit) => Promise<BasicResult<SendAssetsResponseBody>>;
    sendLowestAsset: (props: SendLowestAssetProps, headers?: HeadersInit) => Promise<BasicResult<SendAssetResponseBody>>;
    sendRandomAsset: (props: SendRandomAssetProps, headers?: HeadersInit) => Promise<BasicResult<SendAssetResponseBody>>;
    updateAsset: (props: UpdateAssetProps, headers?: HeadersInit) => Promise<BasicResult<string>>;
    updateAssets: (props: UpdateAssetsProps, headers?: HeadersInit) => Promise<BasicResult<string[]>>;
    updateCollectionAssets: (props: UpdateCollectionAssetsProps, headers?: HeadersInit) => Promise<BasicResult<string>>;

    updateExpressionValues: (props: UpdateExpressionValuesProps, headers?: HeadersInit) => Promise<BasicResult<string|string[]|boolean>>;
    updateAssetExpressionValue: (props: UpdateAssetExpressionValueProps, headers?: HeadersInit) => Promise<BasicResult<string>>;
    updateAssetsExpressionValue: (props: UpdateAssetsExpressionValueProps, headers?: HeadersInit) => Promise<BasicResult<string[]>>;
    updateCollectionAssetsExpressionValue: (props: UpdateCollectionAssetsExpressionValueProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    updateBulkExpressionValues: (props: UpdateBulkExpressionValuesProps, headers?: HeadersInit) => Promise<BasicResult<BulkExpressionValueLog[]>>;
};