import { BasicAnyObject, BasicResponse, BasicResult, BasicUpdatedResponse } from "src/types/basic-types";
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
    handle: string;
    description?: string;
    tags?: string[];
    royaltyHandle?: string;
    collectionImage?: string;
    collectionBanner?: string;
    properties?: BasicAnyObject;
}

export type UpdateCollectionProps = {
    collectionId: string;
    description?: string;
    tags?: string[];
    royaltyHandle?: string;
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
    getCollection: (props: GetCollectionProps) => Promise<GetCollectionsResponse>;
    getCollections: (props: GetCollectionsProps) => Promise<GetCollectionsResponse>;
    getCollectionAssets: (props: GetCollectionAssetsProps) => Promise<GetCollectionAssetsResponse|GetCollectionAssetIdsResponse>;
    createCollection: (props: CreateCollectionProps) => Promise<CreateCollectionResponse>;
    updateCollectionImage: (props: UpdateCollectionImageProps) => Promise<BasicResponse<{ uploaded: boolean; }>>;
    updateCollection: (props: UpdateCollectionProps) => Promise<BasicUpdatedResponse>;
    activateCollection: (props: ActivateCollectionProps) => Promise<BasicUpdatedResponse>;
    deactivateCollection: (props: ActivateCollectionProps) => Promise<BasicUpdatedResponse>;
}

export type SafeCollectionsHandlers = {
    getCollection: (props: GetCollectionProps) => Promise<BasicResult<Collection>>;
    getCollections: (props: GetCollectionsProps) => Promise<BasicResult<Collection[]>>;
    getCollectionAssets: (props: GetCollectionAssetsProps) => Promise<BasicResult<Asset[]|string[]>>;
    createCollection: (props: CreateCollectionProps) => Promise<BasicResult<string>>;
    updateCollectionImage: (props: UpdateCollectionImageProps) => Promise<BasicResult<boolean>>;
    updateCollection: (props: UpdateCollectionProps) => Promise<BasicResult<boolean>>;
    activateCollection: (props: ActivateCollectionProps) => Promise<BasicResult<boolean>>;
    deactivateCollection: (props: ActivateCollectionProps) => Promise<BasicResult<boolean>>;
}