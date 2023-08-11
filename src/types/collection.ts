import { BasicAnyObject, BasicResponse, BasicResult, BasicUpdatedResponse } from "../types/basic-types";
import { Asset } from "./asset";
import { ExpressionValue } from "./expression";
import { UserAlias } from "./user";

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
    type: CollectionType;
    properties: BasicAnyObject;
    status: CollectionStatus;
    createdAt: number;
    updatedAt: number;
    exampleExpressionValues: ExpressionValue[];
};

export type CollectionWithAssetIds = Omit<Collection, 'assets'> & {
    assets: string[];
}
export type CollectionWithAssets = Omit<Collection, 'assets'> & {
    assets: Asset[];
}

export type GetCollectionProps = { collectionId: string; }
export type GetCollectionsProps = { collectionIds: string[]; }
export type GetCollectionsAllProps = { collectionId?: string; collectionIds?: string[]; };

export type GetCollectionAssetsProps = { collectionId: string; serials?: string; };
export type GetCollectionAssetsAllProps = GetCollectionAssetsProps & { idOnly?: boolean; };

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
export type GetCollectionAssetIdsResponse = BasicResponse<{ collection: CollectionWithAssetIds; }>;
export type CreateCollectionResponse = BasicResponse<{ collectionId: string; }>;

export type RawCollectionsHandlers = {
    info: (props: GetCollectionsAllProps, headers?: HeadersInit) => Promise<GetCollectionsResponse>;
    getCollection: (props: GetCollectionProps, headers?: HeadersInit) => Promise<GetCollectionsResponse>;
    getCollections: (props: GetCollectionsProps, headers?: HeadersInit) => Promise<GetCollectionsResponse>;
    assets: (props: GetCollectionAssetsProps, headers?: HeadersInit) => Promise<GetCollectionAssetsResponse|GetCollectionAssetIdsResponse>;
    getCollectionAssets: (props: GetCollectionAssetsProps, headers?: HeadersInit) => Promise<GetCollectionAssetsResponse>;
    getCollectionAssetIds: (props: GetCollectionAssetsProps, headers?: HeadersInit) => Promise<GetCollectionAssetIdsResponse>;
    createCollection: (props: CreateCollectionProps, headers?: HeadersInit) => Promise<CreateCollectionResponse>;
    updateCollectionImage: (props: UpdateCollectionImageProps, headers?: HeadersInit) => Promise<BasicResponse<{ uploaded: boolean; }>>;
    updateCollection: (props: UpdateCollectionProps, headers?: HeadersInit) => Promise<BasicUpdatedResponse>;
    activateCollection: (props: ActivateCollectionProps, headers?: HeadersInit) => Promise<BasicUpdatedResponse>;
    deactivateCollection: (props: ActivateCollectionProps, headers?: HeadersInit) => Promise<BasicUpdatedResponse>;
}

export type SafeCollectionsHandlers = {
    info: (props: GetCollectionsAllProps, headers?: HeadersInit) => Promise<BasicResult<Collection|Collection[]>>;
    getCollection: (props: GetCollectionProps, headers?: HeadersInit) => Promise<BasicResult<Collection>>;
    getCollections: (props: GetCollectionsProps, headers?: HeadersInit) => Promise<BasicResult<Collection[]>>;
    assets: (props: GetCollectionAssetsProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]|string[]>>;
    getCollectionAssets: (props: GetCollectionAssetsProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]>>;
    getCollectionAssetIds: (props: GetCollectionAssetsProps, headers?: HeadersInit) => Promise<BasicResult<string[]>>;
    createCollection: (props: CreateCollectionProps, headers?: HeadersInit) => Promise<BasicResult<string>>;
    updateCollectionImage: (props: UpdateCollectionImageProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    updateCollection: (props: UpdateCollectionProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    activateCollection: (props: ActivateCollectionProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    deactivateCollection: (props: ActivateCollectionProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
}