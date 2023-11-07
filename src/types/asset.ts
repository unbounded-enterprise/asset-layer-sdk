import { AssetLayerRequestOptions } from "src/resources/base";
import type { BasicAnyObject, BasicConditionalBoolResult, BasicResponse, BasicResult, BasicSuccessResponse } from "../types/basic-types";
import type { BulkExpressionValueLog, ExpressionValue, UpdateAssetExpressionValueProps, UpdateAssetExpressionValueResponse, UpdateAssetsExpressionValueProps, UpdateAssetsExpressionValueResponse, UpdateBulkExpressionValuesProps, UpdateCollectionAssetsExpressionValueProps, UpdateExpressionValuesProps } from "./expression";
import type { UserAlias } from "./user";

export type AssetType = 'placeholder' | '';
export type AssetHistoryType = 'mint' | 'send' | 'update' | 'expValAdd' | 'expValDel';
export type AssetHistoryRecord = AssetMintHistory | AssetSendHistory | AssetUpdateHistory | AssetExpValAddHistory | AssetExpValDelHistory;

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
    type?: AssetType;
};
export type AssetIdOnly = { assetId: string; serial: number; expressionValues: ExpressionValue[]; };
export type AssetHistoryBase = { type: AssetHistoryType; assetId: string; createdAt: number; };
export type AssetMintHistory = Omit<AssetHistoryBase, 'type'> & { 
    type: 'mint';
    expressionValues: ExpressionValue[]; 
    properties: BasicAnyObject; 
    user: UserAlias; 
}
export type AssetSendHistory = Omit<AssetHistoryBase, 'type'> & { type: 'send'; sender: UserAlias; receiver: UserAlias; }
export type AssetUpdateHistory = Omit<AssetHistoryBase, 'type'> & { type: 'update'; properties: BasicAnyObject; }
export type AssetExpValAddHistory = Omit<AssetHistoryBase, 'type'> & { type: 'expValAdd'; expressionValueId: string; expressionValue: string; }
export type AssetExpValDelHistory = Omit<AssetHistoryBase, 'type'> & { type: 'expValDel'; expressionValueId: string; }
export type AssetAllHistory = AssetHistoryBase & {
    sender?: UserAlias;
    receiver?: UserAlias;
    user?: UserAlias;
    properties?: BasicAnyObject;
    expressionValues?: ExpressionValue[];
    expressionValueId?: string;
    expressionValue?: string;
}
export type CollectionAssetsObject = { [collectionId: string]: Asset[]; };
export type GetAssetProps = { assetId: string; }
export type GetAssetsProps = { assetIds: string[]; }
export type AssetInfoProps = { assetId?: string; assetIds?: string[]; };

export type GetUserAssetsBaseProps = { walletUserId?: string; };
export type AssetUserProps = GetUserAssetsBaseProps & { idOnly?: boolean; countsOnly?: boolean; };

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

export type GetAssetHistoryProps = { assetId: string; limit?: number; start?: number; }
export type GetAssetOwnershipHistoryProps = GetAssetHistoryProps & { ownersOnly?: boolean; };
export type MintAssetsProps = {
    collectionId: string;
    number: number;
    mintTo: string;
    walletUserId?: string;
    includeAssetIds?: boolean;
}
// export type MintAssetsProps = MintAssetsPropsBase & { includeAssetIds?: string; }

type SendAssetBase = { receiver: string; walletUserId?: string; };
export type SendAssetProps = SendAssetBase & { assetId: string; };
export type SendAssetsProps = SendAssetBase & { assetIds: string[]; };
export type SendCollectionAssetsProps = SendAssetBase & { collectionId: string; };
export type AssetSendProps = SendAssetBase & { assetId?: string; assetIds?: string[]; collectionId?: string; };

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

export type UpdateAssetProps = { assetId: string; properties: BasicAnyObject; }
export type UpdateAssetsProps = { assetIds: string[]; properties: BasicAnyObject; }
export type UpdateCollectionAssetsProps = { collectionId: string; properties: BasicAnyObject; }
export type AssetUpdateProps = { properties: BasicAnyObject; assetId?: string; assetIds?: string[]; collectionId?: string; };

export type AssetCounts = { [collectionId: string]: number };
export type SendAssetResponseBody = { to: string; serial: number; assetId: string; };
export type SendAssetsResponseBody = { to: string; assetIds: string[]; };

export type GetAssetsResponse = BasicResponse<{ assets: Asset[]; }>;
export type GetAssetIdsResponse = BasicResponse<{ assets: AssetIdOnly[]; }>;
export type GetAssetCountsResponse = BasicResponse<{ assets: AssetCounts }>;
export type GetCollectionsAssetsResponse = BasicResponse<{ collections: Asset[]; }>;
export type GetCollectionsAssetIdsResponse = BasicResponse<{ collections: AssetIdOnly[]; }>;
export type GetCollectionsAssetCountsResponse = BasicResponse<{ collections: AssetCounts }>;
export type GetAssetHistoryResponse = BasicResponse<{ history: AssetHistoryRecord[]; }>;
export type GetAssetMarketHistoryResponse = BasicResponse<{ history: AssetSendHistory[]; }>;
export type GetAssetOwnershipHistoryResponse = GetAssetMarketHistoryResponse | BasicResponse<{ history: UserAlias[]; }>;
export type MintAssetsWithIdsResponse = BasicResponse<{ assetIds: string[]; }>;
export type SendAssetResponse = BasicResponse<SendAssetResponseBody>;
export type SendAssetsResponse = BasicResponse<SendAssetsResponseBody>;
export type UpdateAssetResponse = BasicResponse<{ assetId: string; serial: number; }>;
export type UpdateAssetsResponse = BasicResponse<{ assetIds: string[]; }>;
export type UpdateCollectionAssetsResponse = BasicResponse<{ collectionId: string; }>;

export type RawAssetsHandlers = {
    info: (props: AssetInfoProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetAssetsResponse>;
    getAsset: (props: GetAssetProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetAssetsResponse>;
    getAssets: (props: GetAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetAssetsResponse>;
    user: (props?: AssetUserProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    getUserAssets: (props?: GetUserAssetsBaseProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetAssetsResponse>;
    getUserAssetIds: (props?: GetUserAssetsBaseProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetAssetIdsResponse>;
    getUserAssetsCounts: (props?: GetUserAssetsBaseProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetAssetCountsResponse>;
    getUserCollectionAssets: (props: GetUserCollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    getUserCollectionsAssets: (props: GetUserCollectionsAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetCollectionsAssetsResponse|GetCollectionsAssetIdsResponse|GetCollectionsAssetCountsResponse>;
    getUserSlotAssets: (props: GetUserSlotAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    getUserSlotsAssets: (props: GetUserSlotsAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    getAssetHistory: (props: GetAssetHistoryProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetAssetHistoryResponse>;
    getAssetMarketHistory: (props: GetAssetHistoryProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetAssetMarketHistoryResponse>;
    getAssetOwnershipHistory: (props: GetAssetOwnershipHistoryProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetAssetOwnershipHistoryResponse>;
    mint: <T extends MintAssetsProps>(props: T, headers?: HeadersInit, options?: AssetLayerRequestOptions)
        => Promise<T['includeAssetIds'] extends true ? MintAssetsWithIdsResponse : BasicSuccessResponse>;
    send: (props: AssetSendProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<SendAssetResponse|SendAssetsResponse>;
    sendAsset: (props: SendAssetProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<SendAssetResponse>;
    sendAssets: (props: SendAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<SendAssetsResponse>;
    sendCollectionAssets: (props: SendCollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<SendAssetsResponse>;
    sendLowestAsset: (props: SendLowestAssetProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<SendAssetResponse>;
    sendRandomAsset: (props: SendRandomAssetProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<SendAssetResponse>;
    update: (props: AssetUpdateProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<UpdateAssetResponse|UpdateAssetsResponse|UpdateCollectionAssetsResponse>;
    updateAsset: (props: UpdateAssetProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<UpdateAssetResponse>;
    updateAssets: (props: UpdateAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<UpdateAssetsResponse>;
    updateCollectionAssets: (props: UpdateCollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<UpdateCollectionAssetsResponse>;

    expressionValues: (props: UpdateExpressionValuesProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<UpdateAssetExpressionValueResponse|UpdateAssetsExpressionValueResponse|BasicSuccessResponse>;
    updateAssetExpressionValue: (props: UpdateAssetExpressionValueProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<UpdateAssetExpressionValueResponse>;
    updateAssetsExpressionValue: (props: UpdateAssetsExpressionValueProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<UpdateAssetsExpressionValueResponse>;
    updateCollectionAssetsExpressionValue: (props: UpdateCollectionAssetsExpressionValueProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicSuccessResponse>;
    updateBulkExpressionValues: (props: UpdateBulkExpressionValuesProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResponse<{ log: false|BulkExpressionValueLog[]; }>>;
};

export type SafeAssetsHandlers = {
    info: (props: AssetInfoProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Asset|Asset[]>>;
    getAsset: (props: GetAssetProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Asset>>;
    getAssets: (props: GetAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Asset[]>>;
    user: (props?: AssetUserProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Asset[]|AssetIdOnly[]|AssetCounts>>;
    getUserAssets: (props?: GetUserAssetsBaseProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Asset[]>>;
    getUserAssetIds: (props?: GetUserAssetsBaseProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<AssetIdOnly[]>>;
    getUserAssetsCounts: (props?: GetUserAssetsBaseProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<AssetCounts>>;
    getUserCollectionAssets: (props: GetUserCollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Asset[]|AssetIdOnly[]|AssetCounts>>;
    getUserCollectionsAssets: (props: GetUserCollectionsAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Asset[]|AssetIdOnly[]|AssetCounts>>;
    getUserSlotAssets: (props: GetUserSlotAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Asset[]|AssetIdOnly[]|AssetCounts>>;
    getUserSlotsAssets: (props: GetUserSlotsAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Asset[]|AssetIdOnly[]|AssetCounts>>;
    getAssetHistory: (props: GetAssetHistoryProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<AssetHistoryRecord[]>>;
    getAssetMarketHistory: (props: GetAssetHistoryProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<AssetSendHistory[]>>;
    getAssetOwnershipHistory: (props: GetAssetOwnershipHistoryProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<AssetSendHistory[]|UserAlias[]>>;
    mint: <T extends MintAssetsProps>(props: T, headers?: HeadersInit, options?: AssetLayerRequestOptions)
        => Promise<BasicResult<BasicConditionalBoolResult<T, 'includeAssetIds', string[], boolean>>>;
    send: (props: AssetSendProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<SendAssetResponseBody|SendAssetsResponseBody>>;
    sendAsset: (props: SendAssetProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<SendAssetResponseBody>>;
    sendAssets: (props: SendAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<SendAssetsResponseBody>>;
    sendCollectionAssets: (props: SendCollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<SendAssetsResponseBody>>;
    sendLowestAsset: (props: SendLowestAssetProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<SendAssetResponseBody>>;
    sendRandomAsset: (props: SendRandomAssetProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<SendAssetResponseBody>>;
    update: (props: AssetUpdateProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<string|string[]>>;
    updateAsset: (props: UpdateAssetProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<string>>;
    updateAssets: (props: UpdateAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<string[]>>;
    updateCollectionAssets: (props: UpdateCollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<string>>;

    expressionValues: (props: UpdateExpressionValuesProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<string|string[]|boolean>>;
    updateAssetExpressionValue: (props: UpdateAssetExpressionValueProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<string>>;
    updateAssetsExpressionValue: (props: UpdateAssetsExpressionValueProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<string[]>>;
    updateCollectionAssetsExpressionValue: (props: UpdateCollectionAssetsExpressionValueProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<boolean>>;
    updateBulkExpressionValues: (props: UpdateBulkExpressionValuesProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<false|BulkExpressionValueLog[]>>;
};