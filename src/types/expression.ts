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

export type UpdateAssetExpressionValuesProps = {
    nftId: string;
    expressionAttributeName: string;
    value: string;
    expressionId?: string; // OR
    expressionName?: string; // OR
}

export type UpdateAssetsExpressionValuesProps = {
    expressionAttributeName: string;
    value: string;
    nftIds?: string; // OR 1
    collectionId?: string; // OR 1
    expressionId?: string; // OR 2
    expressionName?: string; // OR 2
}

export type UpdateCollectionExpressionValuesProps = {
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