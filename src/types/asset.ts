import { BasicAnyObject, BasicResponse, BasicResult, BasicSuccessResponse } from "src/types/basic-types";

export type Asset = {
  
};

export type GetAssetProps = { nftId: string; }
export type GetAssetsProps = { nftIds: string[]; }

export type GetUserAssetsProps = {
    handle: string; 
    idOnly?: boolean; 
    countsOnly?: boolean; 
}

export type GetUserCollectionAssetsProps = {
    collectionId: string;
    handle: string;
    serials?: string;
    range?: string;
    idOnly?: boolean;
    countsOnly?: boolean;
}

export type GetUserCollectionsAssetsProps = {
    collectionIds: string[];
    handle: string;
    idOnly?: boolean;
    countsOnly?: boolean;
}

export type GetUserSlotAssetsProps = {
    slotId: string;
    handle: string;
    idOnly?: boolean;
    countsOnly?: boolean;
}

export type GetUserSlotsAssetsProps = {
    slotIds: string[];
    handle: string;
    includeDeactivated?: boolean;
    idOnly?: boolean;
    countsOnly?: boolean;
}

export type MintAssetsProps = {
    collectionId: string;
    amount: number;
    handle: string;
}

export type SendAssetProps = {
    recipientHandle: string;
    nftId: string;
    handle: string;
}

export type SendAssetsProps = {
    recipientHandle: string;
    nftIds: string[];
    handle: string;
}

export type SendCollectionAssetsProps = {
    recipientHandle: string;
    collectionId: string;
    handle: string;
}

export type SendLowestAssetProps = {
    recipientHandle: string;
    collectionId: string;
    handle: string;
}

export type SendRandomAssetProps = {
    recipientHandle: string;
    collectionId: string;
    handle: string;
}

export type UpdateAssetProps = {
    nftId: string;
    properties: BasicAnyObject;
}

export type UpdateAssetsProps = {
    nftIds: string[];
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
    getAsset: (props: GetAssetProps) => Promise<GetAssetsResponse>;
    getAssets: (props: GetAssetsProps) => Promise<GetAssetsResponse>;
    getUserAssets: (props: GetUserAssetsProps) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    getUserCollectionAssets: (props: GetUserCollectionAssetsProps) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    getUserCollectionsAssets: (props: GetUserCollectionsAssetsProps) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    getUserSlotAssets: (props: GetUserSlotAssetsProps) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    getUserSlotsAssets: (props: GetUserSlotsAssetsProps) => Promise<GetAssetsResponse|GetAssetIdsResponse|GetAssetCountsResponse>;
    mintAssets: (props: MintAssetsProps) => Promise<BasicSuccessResponse>;
    sendAsset: (props: SendAssetProps) => Promise<SendAssetResponse>;
    sendAssets: (props: SendAssetsProps) => Promise<SendAssetsResponse>;
    sendCollectionAssets: (props: SendCollectionAssetsProps) => Promise<SendAssetsResponse>;
    sendLowestAsset: (props: SendLowestAssetProps) => Promise<SendAssetResponse>;
    sendRandomAsset: (props: SendRandomAssetProps) => Promise<SendAssetResponse>;
    updateAsset: (props: UpdateAssetProps) => Promise<UpdateAssetResponse>;
    updateAssets: (props: UpdateAssetsProps) => Promise<UpdateAssetsResponse>;
    updateCollectionAssets: (props: UpdateCollectionAssetsProps) => Promise<UpdateCollectionAssetsResponse>;
};

export type SafeAssetsHandlers = {
    getAsset: (props: GetAssetProps) => Promise<BasicResult<Asset>>;
    getAssets: (props: GetAssetsProps) => Promise<BasicResult<Asset[]>>;
    getUserAssets: (props: GetUserAssetsProps) => Promise<BasicResult<Asset[]|string[]|AssetCounts>>;
    getUserCollectionAssets: (props: GetUserCollectionAssetsProps) => Promise<BasicResult<Asset[]|string[]|AssetCounts>>;
    getUserCollectionsAssets: (props: GetUserCollectionsAssetsProps) => Promise<BasicResult<Asset[]|string[]|AssetCounts>>;
    getUserSlotAssets: (props: GetUserSlotAssetsProps) => Promise<BasicResult<Asset[]|string[]|AssetCounts>>;
    getUserSlotsAssets: (props: GetUserSlotsAssetsProps) => Promise<BasicResult<Asset[]|string[]|AssetCounts>>;
    mintAssets: (props: MintAssetsProps) => Promise<BasicResult<boolean>>;
    sendAsset: (props: SendAssetProps) => Promise<BasicResult<SendAssetResponseBody>>;
    sendAssets: (props: SendAssetsProps) => Promise<BasicResult<SendAssetsResponseBody>>;
    sendCollectionAssets: (props: SendCollectionAssetsProps) => Promise<BasicResult<SendAssetsResponseBody>>;
    sendLowestAsset: (props: SendLowestAssetProps) => Promise<BasicResult<SendAssetResponseBody>>;
    sendRandomAsset: (props: SendRandomAssetProps) => Promise<BasicResult<SendAssetResponseBody>>;
    updateAsset: (props: UpdateAssetProps) => Promise<BasicResult<string>>;
    updateAssets: (props: UpdateAssetsProps) => Promise<BasicResult<string[]>>;
    updateCollectionAssets: (props: UpdateCollectionAssetsProps) => Promise<BasicResult<string>>;
};