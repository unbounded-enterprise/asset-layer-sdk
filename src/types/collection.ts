import { BasicAnyObject, BasicResponse, BasicResult, BasicUpdatedResponse } from "../types/basic-types";
import { Asset } from "./asset";

export type CollectionType = 'Identical' | 'Unique';

export type Collection = {
    assets: string[];
};

export type CollectionWithAssets = Omit<Collection, 'assets'> & {
    assets: Asset[];
}

export type GetCollectionProps = { collectionId: string; }
export type GetCollectionsProps = { collectionIds: string[]; }

export type GetCollectionAssetsProps = {
    collectionId: string;
    serials?: string;
    idOnly?: boolean;
}

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
    description?: string;
    tags?: string[];
    royaltyRecipient?: string;
    collectionImage?: string;
    collectionBanner?: string;
    properties?: BasicAnyObject;
}

export type UpdateCollectionImageProps = {
    collectionId: string;
    value: string;
}

export type ActivateCollectionProps = { collectionId: string }

export type GetCollectionsResponse = BasicResponse<{ collections: Collection[]; }>;
export type GetCollectionAssetsResponse = BasicResponse<{ collection: CollectionWithAssets; }>;
export type GetCollectionAssetIdsResponse = BasicResponse<{ collection: Collection; }>;
export type CreateCollectionResponse = BasicResponse<{ collectionId: string; }>;

export type RawCollectionsHandlers = {
    getCollection: (props: GetCollectionProps, headers?: HeadersInit) => Promise<GetCollectionsResponse>;
    getCollections: (props: GetCollectionsProps, headers?: HeadersInit) => Promise<GetCollectionsResponse>;
    getCollectionAssets: (props: GetCollectionAssetsProps, headers?: HeadersInit) => Promise<GetCollectionAssetsResponse|GetCollectionAssetIdsResponse>;
    createCollection: (props: CreateCollectionProps, headers?: HeadersInit) => Promise<CreateCollectionResponse>;
    updateCollectionImage: (props: UpdateCollectionImageProps, headers?: HeadersInit) => Promise<BasicResponse<{ uploaded: boolean; }>>;
    updateCollection: (props: UpdateCollectionProps, headers?: HeadersInit) => Promise<BasicUpdatedResponse>;
    activateCollection: (props: ActivateCollectionProps, headers?: HeadersInit) => Promise<BasicUpdatedResponse>;
    deactivateCollection: (props: ActivateCollectionProps, headers?: HeadersInit) => Promise<BasicUpdatedResponse>;
}

export type SafeCollectionsHandlers = {
    getCollection: (props: GetCollectionProps, headers?: HeadersInit) => Promise<BasicResult<Collection>>;
    getCollections: (props: GetCollectionsProps, headers?: HeadersInit) => Promise<BasicResult<Collection[]>>;
    getCollectionAssets: (props: GetCollectionAssetsProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]|string[]>>;
    createCollection: (props: CreateCollectionProps, headers?: HeadersInit) => Promise<BasicResult<string>>;
    updateCollectionImage: (props: UpdateCollectionImageProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    updateCollection: (props: UpdateCollectionProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    activateCollection: (props: ActivateCollectionProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    deactivateCollection: (props: ActivateCollectionProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
}