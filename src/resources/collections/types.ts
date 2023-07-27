import { BasicAnyObject } from "src/types/basic-types";

export declare type CollectionType = 'Identical' | 'Unique';

export declare type Collection = {
  
};

export declare type CreateCollectionProps = {
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

export declare type UpdateCollectionProps = {
    collectionId: string;
    description?: string;
    tags?: string[];
    royaltyHandle?: string;
    collectionImage?: string;
    collectionBanner?: string;
    properties?: BasicAnyObject;
}