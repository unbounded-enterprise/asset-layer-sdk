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

export type UpdateAssetExpressionValueProps = {
    nftId: string;
    expressionAttributeName: string;
    value: string;
    expressionId?: string; // OR
    expressionName?: string; // OR
}

export type UpdateAssetsExpressionValueProps = {
    expressionAttributeName: string;
    value: string;
    nftIds?: string; // OR 1
    collectionId?: string; // OR 1
    expressionId?: string; // OR 2
    expressionName?: string; // OR 2
}

export type UpdateCollectionExpressionValueProps = {
    collectionId: string;
    expressionAttributeName: string;
    value: string;
    expressionId?: string; // OR
    expressionName?: string; // OR
}

export type UpdateBulkExpressionValuesProps = {
    collectionId: string;
    value: string;
}

export type BulkExpressionValueLog = { filename: string; success: boolean; };

export type RawExpressionsHandlers = {
    getExpressionTypes: () => Promise<BasicResponse<{ expressionTypes: ExpressionType[]; }>>;
    // getExpression: (props: GetExpressionProps) => Promise<BasicResponse<{ expression: Expression; }>>;
    // getExpressions: (props: GetExpressionsProps) => Promise<BasicResponse<{ expressions: Expression[]; }>>;
    getSlotExpressions: (props: GetSlotExpressionsProps) => Promise<BasicResponse<{ expressions: Expression[]; }>>;
    createExpression: (props: CreateExpressionProps) => Promise<BasicResponse<{ expressionId: string; }>>;
    updateAssetExpressionValue: (props: UpdateAssetExpressionValueProps) => Promise<BasicResponse<{ expressionValueId: string; }>>;
    updateAssetsExpressionValue: (props: UpdateAssetsExpressionValueProps) => Promise<BasicResponse<{ assetIds: string[]; }>>;
    updateCollectionExpressionValue: (props: UpdateCollectionExpressionValueProps) => Promise<BasicSuccessResponse>;
    updateBulkExpressionValues: (props: UpdateBulkExpressionValuesProps) => Promise<BasicResponse<{ log: BulkExpressionValueLog[]; }>>;
    updateExpression: (props: UpdateExpressionProps) => Promise<BasicSuccessResponse>;
};

export type SafeExpressionsHandlers = {
    getExpressionTypes: () => Promise<BasicResult<ExpressionType[]>>;
    // getExpression: (props: GetExpressionProps) => Promise<BasicResult<Expression>>;
    // getExpressions: (props: GetExpressionsProps) => Promise<BasicResult<Expression[]>>;
    getSlotExpressions: (props: GetSlotExpressionsProps) => Promise<BasicResult<Expression[]>>;
    createExpression: (props: CreateExpressionProps) => Promise<BasicResult<string>>;
    updateAssetExpressionValue: (props: UpdateAssetExpressionValueProps) => Promise<BasicResult<string>>;
    updateAssetsExpressionValue: (props: UpdateAssetsExpressionValueProps) => Promise<BasicResult<string[]>>;
    updateCollectionExpressionValue: (props: UpdateCollectionExpressionValueProps) => Promise<BasicResult<boolean>>;
    updateBulkExpressionValues: (props: UpdateBulkExpressionValuesProps) => Promise<BasicResult<BulkExpressionValueLog[]>>;
    updateExpression: (props: UpdateExpressionProps) => Promise<BasicResult<boolean>>;
};