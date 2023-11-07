import { AssetLayerRequestOptions } from "src/resources/base";
import type { BasicAnyObject, BasicResponse, BasicResult, BasicSuccessResponse, BasicUpdatedResponse } from "../types/basic-types";
import type { Asset, AssetIdOnly } from "./asset";
import type { ExpressionValue } from "./expression";
import type { UserAlias } from "./user";

export type CollectionType = 'Identical' | 'Unique';
export type CollectionStatus = 'active' | 'inactive';

export type Collection = {
    collectionId: string;
    collectionName: string;
    collectionImage: string;
    collectionBanner: string;
    description: string;
    creator: UserAlias;
    slotId: string;
    maximum: number;
    minted: number;
    tags: string[];
    royaltyRecipient: UserAlias;
    status: CollectionStatus;
    createdAt: number;
    updatedAt: number;
    exampleExpressionValues: ExpressionValue[];
    type?: CollectionType;
    properties?: BasicAnyObject;
    defaultProperties?: BasicAnyObject;
};

export type CollectionWithAssetIdOnlys = Omit<Collection, 'assets'> & {
    assets: AssetIdOnly[];
}
export type CollectionWithAssets = Omit<Collection, 'assets'> & {
    assets: Asset[];
}

export type GetCollectionProps = { collectionId: string; }
export type GetCollectionsProps = { collectionIds: string[]; }
export type CollectionInfoProps = { collectionId?: string; collectionIds?: string[]; };

export type GetCollectionAssetsProps = { collectionId: string; serials?: string; };
export type CollectionAssetsProps = GetCollectionAssetsProps & { idOnly?: boolean; };

export type CreateCollectionProps = {
    collectionName: string;
    slotId: string;
    type: CollectionType;
    maximum: number;
    description?: string;
    tags?: string[];
    royaltyRecipient?: string;
    collectionImage?: string;
    collectionBanner?: string;
    properties?: BasicAnyObject;
    walletUserId?: string;
}

export type UpdateCollectionProps = {
    collectionId: string;
    collectionName?: string;
    description?: string;
    tags?: string[];
    royaltyRecipient?: string;
    collectionImage?: string;
    collectionBanner?: string;
    properties?: BasicAnyObject;
}

export type UpdateCollectionImageProps = { collectionId: string; value: string; };
export type UpdateDefaultPropertiesProps = { collectionId: string; defaultProperties: BasicAnyObject; };
export type ActivateCollectionProps = { collectionId: string };
export type DeactivateCollectionProps = ActivateCollectionProps;

export type GetCollectionsResponse = BasicResponse<{ collections: Collection[]; }>;
export type GetCollectionAssetsResponse = BasicResponse<{ collection: CollectionWithAssets; }>;
export type GetCollectionAssetIdsResponse = BasicResponse<{ collection: CollectionWithAssetIdOnlys; }>;
export type CreateCollectionResponse = BasicResponse<{ collectionId: string; }>;

export type RawCollectionsHandlers = {
    info: (props: CollectionInfoProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetCollectionsResponse>;
    getCollection: (props: GetCollectionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetCollectionsResponse>;
    getCollections: (props: GetCollectionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetCollectionsResponse>;
    assets: (props: CollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetCollectionAssetsResponse|GetCollectionAssetIdsResponse>;
    getCollectionAssets: (props: GetCollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetCollectionAssetsResponse>;
    getCollectionAssetIds: (props: GetCollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetCollectionAssetIdsResponse>;
    createCollection: (props: CreateCollectionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<CreateCollectionResponse>;
    updateCollection: (props: UpdateCollectionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicUpdatedResponse>;
    updateCollectionImage: (props: UpdateCollectionImageProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResponse<{ uploaded: boolean; }>>;
    updateDefaultProperties: (props: UpdateDefaultPropertiesProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicSuccessResponse>;
    activateCollection: (props: ActivateCollectionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicUpdatedResponse>;
    deactivateCollection: (props: ActivateCollectionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicUpdatedResponse>;
}

export type SafeCollectionsHandlers = {
    info: (props: CollectionInfoProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Collection|Collection[]>>;
    getCollection: (props: GetCollectionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Collection>>;
    getCollections: (props: GetCollectionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Collection[]>>;
    assets: (props: CollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Asset[]|string[]>>;
    getCollectionAssets: (props: GetCollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Asset[]>>;
    getCollectionAssetIds: (props: GetCollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<AssetIdOnly[]>>;
    createCollection: (props: CreateCollectionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<string>>;
    updateCollection: (props: UpdateCollectionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<boolean>>;
    updateCollectionImage: (props: UpdateCollectionImageProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<boolean>>;
    updateDefaultProperties: (props: UpdateDefaultPropertiesProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<boolean>>;
    activateCollection: (props: ActivateCollectionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<boolean>>;
    deactivateCollection: (props: ActivateCollectionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<boolean>>;
}