import { BasicAnyObject } from "src/types/basic-types";

export type CollectionType = 'Identical' | 'Unique';

export type Collection = {
  
};

export type CreateCollectionProps = {
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

export type UpdateCollectionProps = {
    collectionId: string;
    description?: string;
    tags?: string[];
    royaltyHandle?: string;
    collectionImage?: string;
    collectionBanner?: string;
    properties?: BasicAnyObject;
}