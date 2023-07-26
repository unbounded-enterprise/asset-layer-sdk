export declare type ExpressionAttributeType = 'Image' | 'Audio' | 'Video' | 'Spine 4.0';

export declare type Expression = {
    //slotId: string;
    //expressionId: string;
    //expressionName: string;
    //expressionType: ExpressionType;
    //description?: string;
};

export declare type ExpressionType = {
    expressionTypeId: string;
    expressionTypeName: ExpressionAttributeType;
    expressionAttributes: ExpressionAttribute[];
}

export declare type ExpressionAttribute = {
    expressionAttributeId: string;
    expressionAttributeName: ExpressionAttributeType;
}

export declare type ExpressionCreationProps = {
    slotId: string;
    expressionTypeId: string;
    expressionName: string;
    description?: string;
}

export declare type ExpressionUpdateProps = {
    expressionId: string;
    expressionTypeId: string;
    expressionName: string;
    description?: string;
}

export declare type AssetExpressionValuesUpdateProps = {
    nftId: string;
    expressionAttributeName: string;
    value: string;
    expressionId?: string; // OR
    expressionName?: string; // OR
}

export declare type AssetsExpressionValuesUpdateProps = {
    expressionAttributeName: string;
    value: string;
    nftIds?: string; // OR 1
    collectionId?: string; // OR 1
    expressionId?: string; // OR 2
    expressionName?: string; // OR 2
}

export declare type CollectionExpressionValuesUpdateProps = {
    collectionId: string;
    expressionAttributeName: string;
    value: string;
    expressionId?: string; // OR
    expressionName?: string; // OR
}

export declare type BulkExpressionValuesUpdateProps = {
    collectionId: string;
    value: string;
}