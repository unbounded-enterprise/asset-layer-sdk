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
    assetId: string;
    expressionAttributeName: string;
    value: string;
    expressionId?: string; // OR
    expressionName?: string; // OR
}

export type UpdateAssetsExpressionValueProps = {
    expressionAttributeName: string;
    value: string;
    assetIds?: string; // OR 1
    collectionId?: string; // OR 1
    expressionId?: string; // OR 2
    expressionName?: string; // OR 2
}

export type UpdateCollectionAssetsExpressionValueProps = {
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
    // getExpression: (props: GetExpressionProps) => Promise<BasicResponse<{ expression: Expression; }>>;
    // getExpressions: (props: GetExpressionsProps) => Promise<BasicResponse<{ expressions: Expression[]; }>>;

    getExpressionTypes: () => Promise<BasicResponse<{ expressionTypes: ExpressionType[]; }>>;
    getSlotExpressions: (props: GetSlotExpressionsProps) => Promise<BasicResponse<{ expressions: Expression[]; }>>;
    createExpression: (props: CreateExpressionProps) => Promise<BasicResponse<{ expressionId: string; }>>;
    updateExpression: (props: UpdateExpressionProps) => Promise<BasicSuccessResponse>;
    
    updateAssetExpressionValue: (props: UpdateAssetExpressionValueProps) => Promise<BasicResponse<{ expressionValueId: string; }>>;
    updateAssetsExpressionValue: (props: UpdateAssetsExpressionValueProps) => Promise<BasicResponse<{ assetIds: string[]; }>>;
    updateCollectionAssetsExpressionValue: (props: UpdateCollectionAssetsExpressionValueProps) => Promise<BasicSuccessResponse>;
    updateBulkExpressionValues: (props: UpdateBulkExpressionValuesProps) => Promise<BasicResponse<{ log: BulkExpressionValueLog[]; }>>;
};

export type SafeExpressionsHandlers = {
    // getExpression: (props: GetExpressionProps) => Promise<BasicResult<Expression>>;
    // getExpressions: (props: GetExpressionsProps) => Promise<BasicResult<Expression[]>>;

    getExpressionTypes: () => Promise<BasicResult<ExpressionType[]>>;
    getSlotExpressions: (props: GetSlotExpressionsProps) => Promise<BasicResult<Expression[]>>;
    createExpression: (props: CreateExpressionProps) => Promise<BasicResult<string>>;
    updateExpression: (props: UpdateExpressionProps) => Promise<BasicResult<boolean>>;
    
    updateAssetExpressionValue: (props: UpdateAssetExpressionValueProps) => Promise<BasicResult<string>>;
    updateAssetsExpressionValue: (props: UpdateAssetsExpressionValueProps) => Promise<BasicResult<string[]>>;
    updateCollectionAssetsExpressionValue: (props: UpdateCollectionAssetsExpressionValueProps) => Promise<BasicResult<boolean>>;
    updateBulkExpressionValues: (props: UpdateBulkExpressionValuesProps) => Promise<BasicResult<BulkExpressionValueLog[]>>;
};