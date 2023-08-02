import { BasicAnyObject, BasicResponse } from "src/types/basic-types";

export type Asset = {
  
};

export type GetAssetProps = { nftId: string; }
export type GetAssetsProps = { nftIds: string[]; }
export type GetUserAssetsProps = { handle: string; idOnly?: boolean; countsOnly?: boolean; }

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

export type MintAssetsProps = {
    collectionId: string;
    amount: number;
    handle: string;
}

export type SendAssetProps = {
    recipientHandle: string;
    nftId: string;
    handle: string;
}

export type SendAssetsProps = {
    recipientHandle: string;
    nftIds: string[];
    handle: string;
}

export type SendCollectionAssetsProps = {
    recipientHandle: string;
    collectionId: string;
    handle: string;
}

export type SendLowestAssetProps = {
    recipientHandle: string;
    collectionId: string;
    handle: string;
}

export type SendRandomAssetProps = {
    recipientHandle: string;
    collectionId: string;
    handle: string;
}

export type UpdateAssetProps = {
    nftId: string;
    properties: BasicAnyObject;
}

export type UpdateAssetsProps = {
    nftIds: string[];
    properties: BasicAnyObject;
}

export type UpdateCollectionAssetsProps = {
    collectionId: string;
    properties: BasicAnyObject;
}

export type GetAssetsResponse = BasicResponse<{ assets: Asset[]; }>;
export type SendAssetBody = { to: string; serial: number; assetId: string; };
export type SendAssetResponse = BasicResponse<SendAssetBody>;
export type SendAssetsBody = { to: string; assetIds: string[]; };
export type SendAssetsResponse = BasicResponse<SendAssetsBody>;
export type UpdateAssetResponse = BasicResponse<{ assetId: string; serial: number; }>;
export type UpdateAssetsResponse = BasicResponse<{ assetIds: string[]; }>;
export type UpdateCollectionAssetsResponse = BasicResponse<{ collectionId: string; }>;