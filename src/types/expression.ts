import { BasicResponse, BasicResult, BasicSuccessResponse } from "./basic-types";

export type ExpressionAttributeType = 'Image' | 'Audio' | 'Video' | 'Spine 4.0';

export type Expression = {
    //slotId: string;
    //expressionId: string;
    //expressionName: string;
    //expressionType: ExpressionType;
    //description?: string;
};

export type ExpressionType = {
    expressionTypeId: string;
    expressionTypeName: ExpressionAttributeType;
    expressionAttributes: ExpressionAttribute[];
}

export type ExpressionAttribute = {
    expressionAttributeId: string;
    expressionAttributeName: ExpressionAttributeType;
}

export type GetSlotExpressionsProps = {
    slotId: string;
}

export type CreateExpressionProps = {
    slotId: string;
    expressionTypeId: string;
    expressionName: string;
    description?: string;
}

export type UpdateExpressionProps = {
    expressionId: string;
    expressionTypeId: string;
    expressionName: string;
    description?: string;
}

type UpdateExpressionValueBase = {
    expressionAttributeName: string;
    value: string;
    expressionId?: string; // OR
    expressionName?: string; // OR
}

export type UpdateAssetExpressionValueProps = UpdateExpressionValueBase & { assetId: string; };
export type UpdateAssetsExpressionValueProps = UpdateExpressionValueBase & { assetIds: string[]; };
export type UpdateCollectionAssetsExpressionValueProps = UpdateExpressionValueBase & { collectionId: string; };
export type UpdateAssetExpressionValueAllProps = UpdateExpressionValueBase & { assetId?: string; assetIds?: string; collectionId?: string; };
export type UpdateBulkExpressionValuesProps = { collectionId: string; value: string; };

export type BulkExpressionValueLog = { filename: string; success: boolean; };

export type RawExpressionsHandlers = {
    // getExpression: (props: GetExpressionProps, headers?: HeadersInit) => Promise<BasicResponse<{ expression: Expression; }>>;
    // getExpressions: (props: GetExpressionsProps, headers?: HeadersInit) => Promise<BasicResponse<{ expressions: Expression[]; }>>;

    getExpressionTypes: () => Promise<BasicResponse<{ expressionTypes: ExpressionType[]; }>>;
    getSlotExpressions: (props: GetSlotExpressionsProps, headers?: HeadersInit) => Promise<BasicResponse<{ expressions: Expression[]; }>>;
    createExpression: (props: CreateExpressionProps, headers?: HeadersInit) => Promise<BasicResponse<{ expressionId: string; }>>;
    updateExpression: (props: UpdateExpressionProps, headers?: HeadersInit) => Promise<BasicSuccessResponse>;
    
    updateAssetExpressionValue: (props: UpdateAssetExpressionValueProps, headers?: HeadersInit) => Promise<BasicResponse<{ expressionValueId: string; }>>;
    updateAssetsExpressionValue: (props: UpdateAssetsExpressionValueProps, headers?: HeadersInit) => Promise<BasicResponse<{ assetIds: string[]; }>>;
    updateCollectionAssetsExpressionValue: (props: UpdateCollectionAssetsExpressionValueProps, headers?: HeadersInit) => Promise<BasicSuccessResponse>;
    updateBulkExpressionValues: (props: UpdateBulkExpressionValuesProps, headers?: HeadersInit) => Promise<BasicResponse<{ log: BulkExpressionValueLog[]; }>>;
};

export type SafeExpressionsHandlers = {
    // getExpression: (props: GetExpressionProps, headers?: HeadersInit) => Promise<BasicResult<Expression>>;
    // getExpressions: (props: GetExpressionsProps, headers?: HeadersInit) => Promise<BasicResult<Expression[]>>;

    getExpressionTypes: () => Promise<BasicResult<ExpressionType[]>>;
    getSlotExpressions: (props: GetSlotExpressionsProps, headers?: HeadersInit) => Promise<BasicResult<Expression[]>>;
    createExpression: (props: CreateExpressionProps, headers?: HeadersInit) => Promise<BasicResult<string>>;
    updateExpression: (props: UpdateExpressionProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    
    updateAssetExpressionValue: (props: UpdateAssetExpressionValueProps, headers?: HeadersInit) => Promise<BasicResult<string>>;
    updateAssetsExpressionValue: (props: UpdateAssetsExpressionValueProps, headers?: HeadersInit) => Promise<BasicResult<string[]>>;
    updateCollectionAssetsExpressionValue: (props: UpdateCollectionAssetsExpressionValueProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    updateBulkExpressionValues: (props: UpdateBulkExpressionValuesProps, headers?: HeadersInit) => Promise<BasicResult<BulkExpressionValueLog[]>>;
};