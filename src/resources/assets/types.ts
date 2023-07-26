import { BasicAnyObject } from "src/types/basic-types";

export declare type Asset = {
  
};

export declare type AssetUpdateProps = {
    properties: BasicAnyObject;
    nftId?: string;
    nftIds?: string[];
    collectionId?: string;
}

export declare type GetUserCollectionAssetsProps = {
    collectionId: string;
    handle: string;
    serials?: string;
    range?: string;
    idOnly?: boolean;
    countsOnly?: boolean;
}

export declare type GetUserCollectionsAssetsProps = {
    collectionIds: string[];
    handle: string;
    idOnly?: boolean;
    countsOnly?: boolean;
}

export declare type GetUserSlotAssetsProps = {
    slotId: string;
    handle: string;
    idOnly?: boolean;
    countsOnly?: boolean;
}

export declare type GetUserSlotsAssetsProps = {
    slotIds: string[];
    handle: string;
    includeDeactivated?: boolean;
    idOnly?: boolean;
    countsOnly?: boolean;
}