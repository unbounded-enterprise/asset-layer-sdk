import type { BasicResponse, BasicResult, BasicSuccessResponse } from "./basic-types";
import type { Collection } from "./collection";
import type { CreateExpressionProps, Expression, ExpressionType, GetSlotExpressionsProps, UpdateExpressionProps } from "./expression";

export type Slot = {
    slotId: string;
    slotName: string;
    slotImage: string;
    description: string;
    appId: string;
    acceptingCollections: boolean;
    isPublic: boolean;
    collectionTypes: SlotCollectionTypes;
    createdAt: number;
    updatedAt: number;
    collections: string[];
    expressions: string[];
};

export type SlotWithCollections = Omit<Slot, 'collections'> & {
    collections: Collection[];
}

export type SlotCollectionTypes = 'Identical' | 'Unique' | 'Both';

export type GetSlotProps = { slotId: string; }

export type GetSlotCollectionsProps = { slotId: string; includeDeactivated?: boolean; };
export type GetSlotCollectionsAllProps = GetSlotCollectionsProps & { idOnly?: boolean; };

export type GetSlotResponse = BasicResponse<{ slot: Slot; }>;
export type GetSlotCollectionsResponse = BasicResponse<{ slot: SlotWithCollections; }>;
export type GetSlotCollectionsIdsResponse = BasicResponse<{ slot: Slot; }>;

export type RawSlotsHandlers = {
    getSlot: (props: GetSlotProps, headers?: HeadersInit) => Promise<GetSlotResponse>;
    collections: (props: GetSlotCollectionsAllProps, headers?: HeadersInit) => Promise<GetSlotCollectionsResponse|GetSlotCollectionsIdsResponse>;
    getSlotCollections: (props: GetSlotCollectionsProps, headers?: HeadersInit) => Promise<GetSlotCollectionsResponse>;
    getSlotCollectionIds: (props: GetSlotCollectionsProps, headers?: HeadersInit) => Promise<GetSlotCollectionsIdsResponse>;

    getExpressionTypes: () => Promise<BasicResponse<{ expressionTypes: ExpressionType[]; }>>;
    getSlotExpressions: (props: GetSlotExpressionsProps, headers?: HeadersInit) => Promise<BasicResponse<{ expressions: Expression[]; }>>;
    createExpression: (props: CreateExpressionProps, headers?: HeadersInit) => Promise<BasicResponse<{ expressionId: string; }>>;
    updateExpression: (props: UpdateExpressionProps, headers?: HeadersInit) => Promise<BasicSuccessResponse>;
};

export type SafeSlotsHandlers = {
    getSlot: (props: GetSlotProps, headers?: HeadersInit) => Promise<BasicResult<Slot>>;
    collections: (props: GetSlotCollectionsAllProps, headers?: HeadersInit) => Promise<BasicResult<Collection[]|string[]>>;
    getSlotCollections: (props: GetSlotCollectionsProps, headers?: HeadersInit) => Promise<BasicResult<Collection[]>>;
    getSlotCollectionIds: (props: GetSlotCollectionsProps, headers?: HeadersInit) => Promise<BasicResult<string[]>>;
    
    getExpressionTypes: () => Promise<BasicResult<ExpressionType[]>>;
    getSlotExpressions: (props: GetSlotExpressionsProps, headers?: HeadersInit) => Promise<BasicResult<Expression[]>>;
    createExpression: (props: CreateExpressionProps, headers?: HeadersInit) => Promise<BasicResult<string>>;
    updateExpression: (props: UpdateExpressionProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
};