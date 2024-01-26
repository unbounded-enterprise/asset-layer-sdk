import type { BasicAnyObject, BasicResponse, BasicResult, BasicSuccessResponse, BasicUpdatedResponse } from "../types/basic-types";
import type { Asset, AssetIdOnly } from "./asset";
import type { ExpressionValue } from "./expression";
import type { ShopPrice } from "./shop";
import type { UserAlias } from "./user";

export type CollectionType = 'Identical' | 'Unique';
export type CollectionStatus = 'active' | 'inactive' | 'draft';
export type CollectionMintRights = 'creator' | 'shop' | 'app';
export type CollectionSubmissionStatus = 'draft' | 'submitted' | 'approved' | 'denied' | 'revoked';
export type CollectionRevShare = { appShare: number; creatorShare: number; };
export type CollectionChangeProposal = {
    status: CollectionSubmissionStatus;
    collectionName?: string;
    collectionImage?: string;
    collectionBanner?: string;
    description?: string;
    tags?: string[];
    expressionValues?: ExpressionValue[];
    mintRights?: CollectionMintRights;
    prices?: ShopPrice[];
    revShare?: CollectionRevShare;
    submissionMessage?: string;
    denialMessage?: string;
}
export type CollectionSubmission = {
    submissionId: string;
    collectionId: string;
    status: CollectionSubmissionStatus;
    mintRights: CollectionMintRights;
    prices: ShopPrice[];
    revShare: CollectionRevShare;
    submissionMessage?: string;
    denialMessage?: string;
    changeProposal?: CollectionChangeProposal;
}
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
    submissionId?: string;
    submissionData?: CollectionSubmission;
};

export type CollectionWithAssetIdOnlys = Omit<Collection, 'assets'> & {
    assets: AssetIdOnly[];
}
export type CollectionWithAssets = Omit<Collection, 'assets'> & {
    assets: Asset[];
}

export type GetCollectionProps = { collectionId: string; includeSubmissionData?: boolean; }
export type GetCollectionsProps = { collectionIds: string[]; includeSubmissionData?: boolean; }
export type CollectionInfoProps = { collectionId?: string; collectionIds?: string[]; includeSubmissionData?: boolean; };

export type GetCollectionAssetsProps = { collectionId: string; serials?: string; };
export type CollectionAssetsProps = GetCollectionAssetsProps & { idOnly?: boolean; };

export type CreateCollectionProps = {
    collectionName: string;
    slotId: string;
    type: CollectionType;
    maximum: number | null;
    description?: string;
    tags?: string[];
    royaltyRecipient?: string;
    collectionImage?: string;
    collectionBanner?: string;
    properties?: BasicAnyObject;
    defaultProperties?: BasicAnyObject;
    walletUserId?: string;
    draft?: boolean;
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
    defaultProperties?: BasicAnyObject;
}
export type UpdateCollectionImageProps = { collectionId: string; value: string; };
export type UpdateDefaultPropertiesProps = { collectionId: string; defaultProperties: BasicAnyObject; };
export type ActivateCollectionProps = { collectionId: string };
export type DeactivateCollectionProps = ActivateCollectionProps;
export type CreateCollectionSubmissionProps = Omit<CreateCollectionProps, 'draft'> & {
    mintRights: CollectionMintRights;
    prices: ShopPrice[];
    submissionMessage?: string;
}
export type UpdateCollectionSubmissionProps = {
    collectionId: string;
    mintRights: CollectionMintRights;
    prices: ShopPrice[];
    submissionMessage?: string;
}
export type CollectionSubmissionRequestProps = { collectionId: string; };

export type GetCollectionsResponse = BasicResponse<{ collections: Collection[]; }>;
export type GetCollectionAssetsResponse = BasicResponse<{ collection: CollectionWithAssets; }>;
export type GetCollectionAssetIdsResponse = BasicResponse<{ collection: CollectionWithAssetIdOnlys; }>;
export type CreateCollectionResponse = BasicResponse<{ collectionId: string; }>;
export type CreateCollectionSubmissionResponseBody = { collectionId: string; submissionId: string; };
export type CreateCollectionSubmissionResponse = BasicResponse<CreateCollectionSubmissionResponseBody>;

export type RawCollectionsHandlers = {
    info: (props: CollectionInfoProps, headers?: HeadersInit) => Promise<GetCollectionsResponse>;
    getCollection: (props: GetCollectionProps, headers?: HeadersInit) => Promise<GetCollectionsResponse>;
    getCollections: (props: GetCollectionsProps, headers?: HeadersInit) => Promise<GetCollectionsResponse>;
    assets: (props: CollectionAssetsProps, headers?: HeadersInit) => Promise<GetCollectionAssetsResponse|GetCollectionAssetIdsResponse>;
    getCollectionAssets: (props: GetCollectionAssetsProps, headers?: HeadersInit) => Promise<GetCollectionAssetsResponse>;
    getCollectionAssetIds: (props: GetCollectionAssetsProps, headers?: HeadersInit) => Promise<GetCollectionAssetIdsResponse>;
    createCollection: (props: CreateCollectionProps, headers?: HeadersInit) => Promise<CreateCollectionResponse>;
    updateCollection: (props: UpdateCollectionProps, headers?: HeadersInit) => Promise<BasicUpdatedResponse>;
    updateCollectionImage: (props: UpdateCollectionImageProps, headers?: HeadersInit) => Promise<BasicResponse<{ uploaded: boolean; }>>;
    updateDefaultProperties: (props: UpdateDefaultPropertiesProps, headers?: HeadersInit) => Promise<BasicSuccessResponse>;
    activateCollection: (props: ActivateCollectionProps, headers?: HeadersInit) => Promise<BasicUpdatedResponse>;
    deactivateCollection: (props: ActivateCollectionProps, headers?: HeadersInit) => Promise<BasicUpdatedResponse>;
    createCollectionSubmission: (props: CreateCollectionSubmissionProps, headers?: HeadersInit) => Promise<CreateCollectionSubmissionResponse>;
    updateCollectionSubmission: (props: UpdateCollectionSubmissionProps, headers?: HeadersInit) => Promise<BasicSuccessResponse>;
    collectionSubmissionRequest: (props: CollectionSubmissionRequestProps, headers?: HeadersInit) => Promise<BasicSuccessResponse>;
}

export type SafeCollectionsHandlers = {
    info: (props: CollectionInfoProps, headers?: HeadersInit) => Promise<BasicResult<Collection|Collection[]>>;
    getCollection: (props: GetCollectionProps, headers?: HeadersInit) => Promise<BasicResult<Collection>>;
    getCollections: (props: GetCollectionsProps, headers?: HeadersInit) => Promise<BasicResult<Collection[]>>;
    assets: (props: CollectionAssetsProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]|string[]>>;
    getCollectionAssets: (props: GetCollectionAssetsProps, headers?: HeadersInit) => Promise<BasicResult<Asset[]>>;
    getCollectionAssetIds: (props: GetCollectionAssetsProps, headers?: HeadersInit) => Promise<BasicResult<AssetIdOnly[]>>;
    createCollection: (props: CreateCollectionProps, headers?: HeadersInit) => Promise<BasicResult<string>>;
    updateCollection: (props: UpdateCollectionProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    updateCollectionImage: (props: UpdateCollectionImageProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    updateDefaultProperties: (props: UpdateDefaultPropertiesProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    activateCollection: (props: ActivateCollectionProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    deactivateCollection: (props: ActivateCollectionProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    createCollectionSubmission: (props: CreateCollectionSubmissionProps, headers?: HeadersInit) => Promise<BasicResult<CreateCollectionSubmissionResponseBody>>;
    updateCollectionSubmission: (props: UpdateCollectionSubmissionProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    collectionSubmissionRequest: (props: CollectionSubmissionRequestProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
}