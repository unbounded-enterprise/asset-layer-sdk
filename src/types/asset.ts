import { BasicAnyObject } from "src/types/basic-types";

export type Asset = {
  
};

export type UpdateAssetProps = {
    properties: BasicAnyObject;
    nftId?: string;
    nftIds?: string[];
    collectionId?: string;
}

export type GetUserCollectionAssetsProps = {
    collectionId: string;
    handle: string;
    serials?: string;
    range?: string;
    idOnly?: boolean;
    countsOnly?: boolean;
}

export type GetUserCollectionsAssetsProps = {
    collectionIds: string[];
    handle: string;
    idOnly?: boolean;
    countsOnly?: boolean;
}

export type GetUserSlotAssetsProps = {
    slotId: string;
    handle: string;
    idOnly?: boolean;
    countsOnly?: boolean;
}

export type GetUserSlotsAssetsProps = {
    slotIds: string[];
    handle: string;
    includeDeactivated?: boolean;
    idOnly?: boolean;
    countsOnly?: boolean;
}