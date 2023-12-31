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
    info: (props: AssetInfoProps, headers?: HeadersInit) => Promise<GetAssetsResponse>;
    getAsset: (props: GetAssetProps, headers?: HeadersInit) => Promise<GetAssetsResponse>;
    getAssets: (props: GetAssetsProps, headers?: HeadersInit) => Promise<GetAssetsResponse>;
    user: (props?: AssetUserProps, headers?: HeadersInit) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    getUserAssets: (props?: GetUserAssetsBaseProps, headers?: HeadersInit) => Promise<GetAssetsResponse>;
    getUserAssetIds: (props?: GetUserAssetsBaseProps, headers?: HeadersInit) => Promise<GetAssetIdsResponse>;
    getUserAssetsCounts: (props?: GetUserAssetsBaseProps, headers?: HeadersInit) => Promise<GetAssetCountsResponse>;
    getUserCollectionAssets: (props: GetUserCollectionAssetsProps, headers?: HeadersInit) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    getUserCollectionsAssets: (props: GetUserCollectionsAssetsProps, headers?: HeadersInit) => Promise<GetCollectionsAssetsResponse|GetCollectionsAssetIdsResponse|GetCollectionsAssetCountsResponse>;
    getUserSlotAssets: (props: GetUserSlotAssetsProps, headers?: HeadersInit) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    getUserSlotsAssets: (props: GetUserSlotsAssetsProps, headers?: HeadersInit) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    getAssetHistory: (props: GetAssetHistoryProps, headers?: HeadersInit) => Promise<GetAssetHistoryResponse>;
    getAssetMarketHistory: (props: GetAssetHistoryProps, headers?: HeadersInit) => Promise<GetAssetMarketHistoryResponse>;
    getAssetOwnershipHistory: (props: GetAssetOwnershipHistoryProps, headers?: HeadersInit) => Promise<GetAssetOwnershipHistoryResponse>;
    mint: <T extends MintAssetsProps>(props: T, headers?: HeadersInit)
        => Promise<T['includeAssetIds'] extends true ? MintAssetsWithIdsResponse : BasicSuccessResponse>;
    send: (props: AssetSendProps, headers?: HeadersInit) => Promise<SendAssetResponse|SendAssetsResponse>;
    sendAsset: (props: SendAssetProps, headers?: HeadersInit) => Promise<SendAssetResponse>;
    sendAssets: (props: SendAssetsProps, headers?: HeadersInit) => Promise<SendAssetsResponse>;
    sendCollectionAssets: (props: SendCollectionAssetsProps, headers?: HeadersInit) => Promise<SendAssetsResponse>;
    sendLowestAsset: (props: SendLowestAssetProps, headers?: HeadersInit) => Promise<SendAssetResponse>;
    sendRandomAsset: (props: SendRandomAssetProps, headers?: HeadersInit) => Promise<SendAssetResponse>;
    update: (props: AssetUpdateProps, headers?: HeadersInit) => Promise<UpdateAssetResponse|UpdateAssetsResponse|UpdateCollectionAssetsResponse>;
    updateAsset: (props: UpdateAssetProps, headers?: HeadersInit) => Promise<UpdateAssetResponse>;
    updateAssets: (props: UpdateAssetsProps, headers?: HeadersInit) => Promise<UpdateAssetsResponse>;
    updateCollectionAssets: (props: UpdateCollectionAssetsProps, headers?: HeadersInit) => Promise<UpdateCollectionAssetsResponse>;

    expressionValues: (props: UpdateExpressionValuesProps, headers?: HeadersInit) => Promise<UpdateAssetExpressionValueResponse|UpdateAssetsExpressionValueResponse|BasicSuccessResponse>;
    updateAssetExpressionValue: (props: UpdateAssetExpressionValueProps, headers?: HeadersInit) => Promise<UpdateAssetExpressionValueResponse>;
    updateAssetsExpressionValue: (props: UpdateAssetsExpressionValueProps, headers?: HeadersInit) => Promise<UpdateAssetsExpressionValueResponse>;
    updateCollectionAssetsExpressionValue: (props: UpdateCollectionAssetsExpressionValueProps, headers?: HeadersInit) => Promise<BasicSuccessResponse>;
    updateBulkExpressionValues: (props: UpdateBulkExpressionValuesProps, headers?: HeadersInit) => Promise<BasicResponse<{ log: false|BulkExpressionValueLog[]; }>>;
};

export type SafeAssetsHandlers = {
    info: (props: AssetInfoProps, headers?: HeadersInit) => Promise<BasicResult<Asset|Asset[]>>;
    getAsset: (props: GetAssetProps, headers?: HeadersInit) => Promise<BasicResult<Asset>>;
    getAssets: (props: GetAssetsProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]>>;
    user: (props?: AssetUserProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]|AssetIdOnly[]|AssetCounts>>;
    getUserAssets: (props?: GetUserAssetsBaseProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]>>;
    getUserAssetIds: (props?: GetUserAssetsBaseProps, headers?: HeadersInit) => Promise<BasicResult<AssetIdOnly[]>>;
    getUserAssetsCounts: (props?: GetUserAssetsBaseProps, headers?: HeadersInit) => Promise<BasicResult<AssetCounts>>;
    getUserCollectionAssets: (props: GetUserCollectionAssetsProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]|AssetIdOnly[]|AssetCounts>>;
    getUserCollectionsAssets: (props: GetUserCollectionsAssetsProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]|AssetIdOnly[]|AssetCounts>>;
    getUserSlotAssets: (props: GetUserSlotAssetsProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]|AssetIdOnly[]|AssetCounts>>;
    getUserSlotsAssets: (props: GetUserSlotsAssetsProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]|AssetIdOnly[]|AssetCounts>>;
    getAssetHistory: (props: GetAssetHistoryProps, headers?: HeadersInit) => Promise<BasicResult<AssetHistoryRecord[]>>;
    getAssetMarketHistory: (props: GetAssetHistoryProps, headers?: HeadersInit) => Promise<BasicResult<AssetSendHistory[]>>;
    getAssetOwnershipHistory: (props: GetAssetOwnershipHistoryProps, headers?: HeadersInit) => Promise<BasicResult<AssetSendHistory[]|UserAlias[]>>;
    mint: <T extends MintAssetsProps>(props: T, headers?: HeadersInit)
        => Promise<BasicResult<BasicConditionalBoolResult<T, 'includeAssetIds', string[], boolean>>>;
    send: (props: AssetSendProps, headers?: HeadersInit) => Promise<BasicResult<SendAssetResponseBody|SendAssetsResponseBody>>;
    sendAsset: (props: SendAssetProps, headers?: HeadersInit) => Promise<BasicResult<SendAssetResponseBody>>;
    sendAssets: (props: SendAssetsProps, headers?: HeadersInit) => Promise<BasicResult<SendAssetsResponseBody>>;
    sendCollectionAssets: (props: SendCollectionAssetsProps, headers?: HeadersInit) => Promise<BasicResult<SendAssetsResponseBody>>;
    sendLowestAsset: (props: SendLowestAssetProps, headers?: HeadersInit) => Promise<BasicResult<SendAssetResponseBody>>;
    sendRandomAsset: (props: SendRandomAssetProps, headers?: HeadersInit) => Promise<BasicResult<SendAssetResponseBody>>;
    update: (props: AssetUpdateProps, headers?: HeadersInit) => Promise<BasicResult<string|string[]>>;
    updateAsset: (props: UpdateAssetProps, headers?: HeadersInit) => Promise<BasicResult<string>>;
    updateAssets: (props: UpdateAssetsProps, headers?: HeadersInit) => Promise<BasicResult<string[]>>;
    updateCollectionAssets: (props: UpdateCollectionAssetsProps, headers?: HeadersInit) => Promise<BasicResult<string>>;

    expressionValues: (props: UpdateExpressionValuesProps, headers?: HeadersInit) => Promise<BasicResult<string|string[]|boolean>>;
    updateAssetExpressionValue: (props: UpdateAssetExpressionValueProps, headers?: HeadersInit) => Promise<BasicResult<string>>;
    updateAssetsExpressionValue: (props: UpdateAssetsExpressionValueProps, headers?: HeadersInit) => Promise<BasicResult<string[]>>;
    updateCollectionAssetsExpressionValue: (props: UpdateCollectionAssetsExpressionValueProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    updateBulkExpressionValues: (props: UpdateBulkExpressionValuesProps, headers?: HeadersInit) => Promise<BasicResult<false|BulkExpressionValueLog[]>>;
};