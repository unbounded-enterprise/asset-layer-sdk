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
export type CreateListingAllProps = CreateListingBase & { assetId?: string; assetIds?: string[]; collectionId?: string; };

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
export type CreateListingsResponse = BasicResponse<{ assetIds: string[]; }>;

export type RawListingsHandlers = {
    getListing: (props: GetListingProps, headers?: HeadersInit) => Promise<BasicResponse<{ listing: Listing; }>>;
    getUserListings: (props: GetUserListingsProps, headers?: HeadersInit) => Promise<BasicResponse<{ listings: Listing[] | ListingCounts; }>>;
    getCollectionListings: (props: GetCollectionListingsProps, headers?: HeadersInit) => Promise<BasicResponse<{ listing: Listing[] | ListingCounts; }>>;
    getAppListings: (props: GetAppListingsProps, headers?: HeadersInit) => Promise<BasicResponse<{ listing: Listing[] | ListingCounts; }>>;
    create: (props: CreateListingAllProps, headers?: HeadersInit) => Promise<CreateListingResponse|CreateListingsResponse>;
    createListing: (props: CreateListingProps, headers?: HeadersInit) => Promise<CreateListingResponse>;
    createListings: (props: CreateListingsProps, headers?: HeadersInit) => Promise<CreateListingsResponse>;
    createCollectionListings: (props: CreateCollectionListingsProps, headers?: HeadersInit) => Promise<CreateListingsResponse>;
    updateListing: (props: UpdateListingProps, headers?: HeadersInit) => Promise<BasicSuccessResponse>;
    buyListing: (props: BuyListingProps, headers?: HeadersInit) => Promise<BasicResponse<{ buy: boolean; }>>;
    removeListing: (props: RemoveListingProps, headers?: HeadersInit) => Promise<BasicSuccessResponse>;
};

export type SafeListingsHandlers = {
    getListing: (props: GetListingProps, headers?: HeadersInit) => Promise<BasicResult<Listing>>;
    getUserListings: (props: GetUserListingsProps, headers?: HeadersInit) => Promise<BasicResult<Listing[] | ListingCounts>>;
    getCollectionListings: (props: GetCollectionListingsProps, headers?: HeadersInit) => Promise<BasicResult<Listing[] | ListingCounts>>;
    getAppListings: (props: GetAppListingsProps, headers?: HeadersInit) => Promise<BasicResult<Listing[] | ListingCounts>>;
    create: (props: CreateListingAllProps, headers?: HeadersInit) => Promise<BasicResult<CreateListingResponseBody|string[]>>;
    createListing: (props: CreateListingProps, headers?: HeadersInit) => Promise<BasicResult<CreateListingResponseBody>>;
    createListings: (props: CreateListingsProps, headers?: HeadersInit) => Promise<BasicResult<string[]>>;
    createCollectionListings: (props: CreateCollectionListingsProps, headers?: HeadersInit) => Promise<BasicResult<string[]>>;
    updateListing: (props: UpdateListingProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    buyListing: (props: BuyListingProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    removeListing: (props: RemoveListingProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
};