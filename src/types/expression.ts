import type { BasicResponse, BasicResult, BasicSuccessResponse } from "./basic-types";

export type ExpressionAttributeType = 'Image' | 'Audio' | 'Video' | 'Character_Spine4.0' | 'AssetBundle';

export type Expression = {
    slotId: string;
    expressionId: string;
    expressionName: string;
    expressionType: ExpressionType;
    description?: string;
};

export type ExpressionValue = {
    value: string; // url to content
    expressionValueId: string;
    expressionAttribute: ExpressionAttribute;
    expression: { 
      expressionId: string, 
      expressionName: string 
    };
}

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

export type UpdateExpressionValuesProps = UpdateExpressionValueBase & { assetId?: string; assetIds?: string[]; collectionId?: string; };
export type UpdateAssetExpressionValueProps = UpdateExpressionValueBase & { assetId: string; };
export type UpdateAssetsExpressionValueProps = UpdateExpressionValueBase & { assetIds: string[]; };
export type UpdateCollectionAssetsExpressionValueProps = UpdateExpressionValueBase & { collectionId: string; };
export type UpdateBulkExpressionValuesProps = { collectionId: string; value: string; };

export type UpdateAssetExpressionValueResponse = BasicResponse<{ expressionValueId: string; }>;
export type UpdateAssetsExpressionValueResponse = BasicResponse<{ assetIds: string[]; }>;

export type BulkExpressionValueLog = { filename: string; success: boolean; };

export type RawExpressionsHandlers = {
    // getExpression: (props: GetExpressionProps, headers?: HeadersInit) => Promise<BasicResponse<{ expression: Expression; }>>;
    // getExpressions: (props: GetExpressionsProps, headers?: HeadersInit) => Promise<BasicResponse<{ expressions: Expression[]; }>>;

    getExpressionTypes: () => Promise<BasicResponse<{ expressionTypes: ExpressionType[]; }>>;
    getSlotExpressions: (props: GetSlotExpressionsProps, headers?: HeadersInit) => Promise<BasicResponse<{ expressions: Expression[]; }>>;
    createExpression: (props: CreateExpressionProps, headers?: HeadersInit) => Promise<BasicResponse<{ expressionId: string; }>>;
    updateExpression: (props: UpdateExpressionProps, headers?: HeadersInit) => Promise<BasicSuccessResponse>;
    
    updateExpressionValues: (props: UpdateExpressionValuesProps, headers?: HeadersInit) => Promise<UpdateAssetExpressionValueResponse|UpdateAssetsExpressionValueResponse|BasicSuccessResponse>;
    updateAssetExpressionValue: (props: UpdateAssetExpressionValueProps, headers?: HeadersInit) => Promise<UpdateAssetExpressionValueResponse>;
    updateAssetsExpressionValue: (props: UpdateAssetsExpressionValueProps, headers?: HeadersInit) => Promise<UpdateAssetsExpressionValueResponse>;
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
    
    updateExpressionValues: (props: UpdateAssetExpressionValueProps, headers?: HeadersInit) => Promise<BasicResult<string|string[]|boolean>>;
    updateAssetExpressionValue: (props: UpdateAssetExpressionValueProps, headers?: HeadersInit) => Promise<BasicResult<string>>;
    updateAssetsExpressionValue: (props: UpdateAssetsExpressionValueProps, headers?: HeadersInit) => Promise<BasicResult<string[]>>;
    updateCollectionAssetsExpressionValue: (props: UpdateCollectionAssetsExpressionValueProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    updateBulkExpressionValues: (props: UpdateBulkExpressionValuesProps, headers?: HeadersInit) => Promise<BasicResult<BulkExpressionValueLog[]>>;
};