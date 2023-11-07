import { AssetLayerRequestOptions } from "src/resources/base";
import type { BasicResponse, BasicResult, BasicSuccessResponse } from "./basic-types";
import type { Collection } from "./collection";
import type { CreateExpressionProps, Expression, ExpressionType, GetSlotExpressionsProps, UpdateExpressionProps } from "./expression";

export type SlotCollectionType = 'Identical' | 'Unique' | 'Both';

export type Slot = {
    slotId: string;
    slotName: string;
    slotImage: string;
    description: string;
    appId: string;
    acceptingCollections: boolean;
    isPublic: boolean;
    collectionTypes: SlotCollectionType;
    createdAt: number;
    updatedAt: number;
    collections: string[];
    expressions: string[];
};
export type SlotWithExpressions = Omit<Slot, 'expressions'> & {
    expressions: Expression[];
}
export type SlotWithCollections = Omit<Slot, 'collections'> & {
    collections: Collection[];
}
export type SlotWithExpressionsAndCollections = Omit<Slot, 'expressions'|'collections'> & {
    expressions: Expression[];
    collections: Collection[];
}

export type GetSlotProps = { slotId: string; }

export type GetSlotCollectionsProps = { slotId: string; includeDeactivated?: boolean; };
export type SlotCollectionsProps = GetSlotCollectionsProps & { idOnly?: boolean; };

export type GetSlotResponse = BasicResponse<{ slot: Slot; }>;
export type GetSlotCollectionsResponse = BasicResponse<{ slot: SlotWithCollections; }>;
export type GetSlotCollectionsIdsResponse = BasicResponse<{ slot: Slot; }>;

export type RawSlotsHandlers = {
    getSlot: (props: GetSlotProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetSlotResponse>;
    collections: (props: SlotCollectionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetSlotCollectionsResponse|GetSlotCollectionsIdsResponse>;
    getSlotCollections: (props: GetSlotCollectionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetSlotCollectionsResponse>;
    getSlotCollectionIds: (props: GetSlotCollectionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<GetSlotCollectionsIdsResponse>;

    getExpressionTypes: () => Promise<BasicResponse<{ expressionTypes: ExpressionType[]; }>>;
    getSlotExpressions: (props: GetSlotExpressionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResponse<{ expressions: Expression[]; }>>;
    createExpression: (props: CreateExpressionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResponse<{ expressionId: string; }>>;
    updateExpression: (props: UpdateExpressionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicSuccessResponse>;
};

export type SafeSlotsHandlers = {
    getSlot: (props: GetSlotProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Slot>>;
    collections: (props: SlotCollectionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Collection[]|string[]>>;
    getSlotCollections: (props: GetSlotCollectionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Collection[]>>;
    getSlotCollectionIds: (props: GetSlotCollectionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<string[]>>;
    
    getExpressionTypes: () => Promise<BasicResult<ExpressionType[]>>;
    getSlotExpressions: (props: GetSlotExpressionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<Expression[]>>;
    createExpression: (props: CreateExpressionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<string>>;
    updateExpression: (props: UpdateExpressionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<boolean>>;
};