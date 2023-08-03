import { BasicResponse, BasicResult, BasicSuccessResponse } from "./basic-types";
import { UserAlias } from "./user";

export type ListingStatus = 'deleted' | 'cancelled' | 'active' | 'inactive' | 'sold';
export type ListingUpdateStatus = 'active' | 'inactive';

export type ListingTXIDs = {
    initial?: string;
    paid?: string;
    payment?: string;
}
export type Listing = {
    listingId: string;
    assetId: string;
    collectionName: string;
    serial: number;
    liveTime: string;
    collectionId: string;
    slotId: string;
    appId: string;
    price: number;
    status: ListingStatus;
    currency: string;
    seller: UserAlias;
    createdAt: number;
    updatedAt: number;
    txids?: ListingTXIDs;
    buyer?: UserAlias;
    soldTime?: number;
    cancelledTime?: number;
};

export type GetListingProps = { listingId: string, status?: ListingStatus };

export type GetUserListingsProps = {
    sellerOnly?: boolean;
    buyerOnly?: boolean;
    status?: ListingStatus;
    collectionId?: string;
    countsOnly?: boolean;
    walletUserId?: string;
}

export type GetCollectionListingsProps = {
    collectionId?: string;
    collectionIds?: string;
    status?: ListingStatus;
    lastUpdatedAt?: number;
    countsOnly?: boolean;
    collectionStats?: boolean;
}

export type GetAppListingsProps = {
    appId: string;
    status?: ListingStatus;
    lastUpdatedAt?: number;
    countsOnly?: boolean;
    collectionStats?: boolean;
}

type CreateListingBase = {
    price: number;
    liveTime?: number;
    status?: ListingUpdateStatus;
    walletUserId?: string;
}
export type CreateListingProps = CreateListingBase & { assetId: string; };
export type CreateListingsProps = CreateListingBase & { assetIds: string[]; };
export type CreateCollectionListingsProps = CreateListingBase & { collectionId: string; };
export type CreateListingAllProps = CreateListingBase & { assetId: string; assetIds: string[]; collectionId: string; };

export type UpdateListingProps = {
    listingId: string;
    price?: number;
    liveTime?: number;
    status?: ListingUpdateStatus;
    walletUserId?: string;
}

export type BuyListingProps = {
    listingId: string;
    price?: number | string;
}

export type RemoveListingProps = {
    listingId: string;
    walletUserId?: string;
}

type CreateListingResponseBody = {
    listingId: string;
    assetId: string;
    price: number;
    status: ListingStatus;
    liveTime: number;
    seller: UserAlias;
}

export type ListingCounts = { [listingId: string]: number };

export type CreateListingResponse = BasicResponse<{ listing: CreateListingResponseBody; }>;

export type RawListingsHandlers = {
    getListing: (props: GetListingProps) => Promise<BasicResponse<{ listing: Listing; }>>;
    getUserListings: (props: GetUserListingsProps) => Promise<BasicResponse<{ listings: Listing[] | ListingCounts; }>>;
    getCollectionListings: (props: GetCollectionListingsProps) => Promise<BasicResponse<{ listing: Listing[] | ListingCounts; }>>;
    getAppListings: (props: GetAppListingsProps) => Promise<BasicResponse<{ listing: Listing[] | ListingCounts; }>>;
    createListing: (props: CreateListingProps) => Promise<CreateListingResponse>;
    createListings: (props: CreateListingsProps) => Promise<BasicResponse<{ assetIds: string[]; }>>;
    createCollectionListings: (props: CreateCollectionListingsProps) => Promise<BasicResponse<{ assetIds: string[]; }>>;
    updateListing: (props: UpdateListingProps) => Promise<BasicSuccessResponse>;
    buyListing: (props: BuyListingProps) => Promise<BasicResponse<{ buy: boolean; }>>;
    removeListing: (props: RemoveListingProps) => Promise<BasicSuccessResponse>;
};

export type SafeListingsHandlers = {
    getListing: (props: GetListingProps) => Promise<BasicResult<Listing>>;
    getUserListings: (props: GetUserListingsProps) => Promise<BasicResult<Listing[] | ListingCounts>>;
    getCollectionListings: (props: GetCollectionListingsProps) => Promise<BasicResult<Listing[] | ListingCounts>>;
    getAppListings: (props: GetAppListingsProps) => Promise<BasicResult<Listing[] | ListingCounts>>;
    createListing: (props: CreateListingProps) => Promise<BasicResult<CreateListingResponseBody>>;
    createListings: (props: CreateListingsProps) => Promise<BasicResult<string[]>>;
    createCollectionListings: (props: CreateCollectionListingsProps) => Promise<BasicResult<string[]>>;
    updateListing: (props: UpdateListingProps) => Promise<BasicResult<boolean>>;
    buyListing: (props: BuyListingProps) => Promise<BasicResult<boolean>>;
    removeListing: (props: RemoveListingProps) => Promise<BasicResult<boolean>>;
};