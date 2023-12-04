import type { BasicResponse, BasicResult, BasicSuccessResponse } from "./basic-types";
import type { UserAlias } from "./user";

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
    liveTime: number;
    collectionId: string;
    slotId: string;
    appId: string;
    price: number;
    status: ListingStatus;
    seller: UserAlias;
    createdAt: number;
    updatedAt: number;
    currency?: string;
    currencyId?: string;
    txids?: ListingTXIDs;
    buyer?: UserAlias;
    soldTime?: number;
    cancelledTime?: number;
};

export type GetListingProps = { listingId: string; };

export type GetUserListingsMinProps = { status?: ListingStatus; walletUserId?: string; };
export type GetUserListingsProps = GetUserListingsMinProps & { sellerOnly?: boolean; buyerOnly?: boolean; };
export type GetUserCollectionListingsProps = GetUserListingsMinProps & { collectionId: string; };
export type ListingUserProps = GetUserListingsProps & { collectionId?: string; countsOnly?: boolean; };
export type GetUserHistoryProps = { walletUserId?: string; };

export type GetCollectionListingsBaseProps = {
    status?: ListingStatus;
    lastUpdatedAt?: number;
}
export type GetCollectionListingsProps = GetCollectionListingsBaseProps & { collectionId: string; };
export type GetCollectionsListingsProps = GetCollectionListingsBaseProps & { collectionIds: string[]; };
export type ListingCollectionProps = GetCollectionListingsBaseProps & { 
    collectionId?: string;
    collectionIds?: string[];
    countsOnly?: boolean; 
    collectionStats?: boolean;
};

export type GetAppListingsProps = {
    appId: string;
    status?: ListingStatus;
    lastUpdatedAt?: number;
    includeForeignSlots?: boolean;
}
export type ListingAppProps = GetAppListingsProps & { countsOnly?: boolean; collectionStats?: boolean; };

type ListAssetBase = {
    price: number;
    liveTime?: number;
    status?: ListingUpdateStatus;
    walletUserId?: string;
    currencyId?: string;
    currency?: string;
}
export type ListAssetProps = ListAssetBase & { assetId: string; };
export type ListAssetsProps = ListAssetBase & { assetIds: string[]; };
export type ListCollectionAssetsProps = ListAssetBase & { collectionId: string; };
export type ListingNewProps = ListAssetBase & { assetId?: string; assetIds?: string[]; collectionId?: string; };

export type UpdateListingProps = {
    listingId: string;
    price?: number;
    liveTime?: number;
    status?: ListingUpdateStatus;
    walletUserId?: string;
    currencyId?: string;
    currency?: string;
}

export type BuyListingProps = {
    listingId: string;
    price: number | string;
    currencyId?: string;
    currency?: string;
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

export type ListingsCounts = { [collectionId: string]: number; };
export type CollectionListingsStats = {
    count: number;
    lowest: number;
    highest: number;
    newest: number;
    newestDate: number;
    oldest: number;
    oldestDate: number;
};
export type ListingsStats = { 
    [collectionId: string]: {
        [currencyId: string]: CollectionListingsStats; 
    };
};

export type CreateListingResponse = BasicResponse<{ listing: CreateListingResponseBody; }>;
export type CreateListingsResponse = BasicResponse<{ assetIds: string[]; }>;

export type RawListingsHandlers = {
    getListing: (props: GetListingProps, headers?: HeadersInit) => Promise<BasicResponse<{ listing: Listing; }>>;
    user: (props?: ListingUserProps, headers?: HeadersInit) => Promise<BasicResponse<{ listings: Listing[] | ListingsCounts; }>>;
    getUserListings: (props?: GetUserListingsMinProps, headers?: HeadersInit) => Promise<BasicResponse<{ listings: Listing[]; }>>;
    getUserListingsCounts: (props?: GetUserListingsMinProps, headers?: HeadersInit) => Promise<BasicResponse<{ listings: ListingsCounts; }>>;
    getUserCollectionListings: (props: GetUserCollectionListingsProps, headers?: HeadersInit) => Promise<BasicResponse<{ listings: Listing[]; }>>;
    getUserCollectionListingsCounts: (props: GetUserCollectionListingsProps, headers?: HeadersInit) => Promise<BasicResponse<{ listings: ListingsCounts; }>>;
    getUserSales: (props?: GetUserHistoryProps, headers?: HeadersInit) => Promise<BasicResponse<{ listings: Listing[]; }>>;
    getUserSalesCounts: (props?: GetUserHistoryProps, headers?: HeadersInit) => Promise<BasicResponse<{ listings: ListingsCounts; }>>;
    getUserPurchases: (props?: GetUserHistoryProps, headers?: HeadersInit) => Promise<BasicResponse<{ listings: Listing[]; }>>;
    getUserPurchasesCounts: (props?: GetUserHistoryProps, headers?: HeadersInit) => Promise<BasicResponse<{ listings: ListingsCounts; }>>;
    collection: (props: ListingCollectionProps, headers?: HeadersInit) => Promise<BasicResponse<{ listing: Listing[] | ListingsCounts | ListingsStats; }>>;
    getCollectionListings: (props: GetCollectionListingsProps, headers?: HeadersInit) => Promise<BasicResponse<{ listing: Listing[]; }>>;
    getCollectionsListings: (props: GetCollectionsListingsProps, headers?: HeadersInit) => Promise<BasicResponse<{ listing: Listing[]; }>>;
    getCollectionListingsCounts: (props: GetCollectionListingsProps, headers?: HeadersInit) => Promise<BasicResponse<{ listing: ListingsCounts; }>>;
    getCollectionsListingsCounts: (props: GetCollectionsListingsProps, headers?: HeadersInit) => Promise<BasicResponse<{ listing: ListingsCounts; }>>;
    getCollectionListingsStats: (props: GetCollectionListingsProps, headers?: HeadersInit) => Promise<BasicResponse<{ listing: ListingsStats; }>>;
    getCollectionsListingsStats: (props: GetCollectionsListingsProps, headers?: HeadersInit) => Promise<BasicResponse<{ listing: ListingsStats; }>>;
    app: (props: ListingAppProps, headers?: HeadersInit) => Promise<BasicResponse<{ listing: Listing[] | ListingsCounts | ListingsStats; }>>;
    getAppListings: (props: GetAppListingsProps, headers?: HeadersInit) => Promise<BasicResponse<{ listing: Listing[] }>>;
    getAppListingsCounts: (props: GetAppListingsProps, headers?: HeadersInit) => Promise<BasicResponse<{ listing: ListingsCounts }>>;
    getAppListingsStats: (props: GetAppListingsProps, headers?: HeadersInit) => Promise<BasicResponse<{ listing: ListingsStats }>>;
    new: (props: ListingNewProps, headers?: HeadersInit) => Promise<CreateListingResponse | CreateListingsResponse>;
    listAsset: (props: ListAssetProps, headers?: HeadersInit) => Promise<CreateListingResponse>;
    listAssets: (props: ListAssetsProps, headers?: HeadersInit) => Promise<CreateListingsResponse>;
    listCollectionAssets: (props: ListCollectionAssetsProps, headers?: HeadersInit) => Promise<CreateListingsResponse>;
    updateListing: (props: UpdateListingProps, headers?: HeadersInit) => Promise<BasicSuccessResponse>;
    buyListing: (props: BuyListingProps, headers?: HeadersInit) => Promise<BasicResponse<{ buy: boolean; }>>;
    removeListing: (props: RemoveListingProps, headers?: HeadersInit) => Promise<BasicSuccessResponse>;
};

export type SafeListingsHandlers = {
    getListing: (props: GetListingProps, headers?: HeadersInit) => Promise<BasicResult<Listing>>;
    user: (props?: ListingUserProps, headers?: HeadersInit) => Promise<BasicResult<Listing[] | ListingsCounts>>;
    getUserListings: (props?: GetUserListingsMinProps, headers?: HeadersInit) => Promise<BasicResult<Listing[]>>;
    getUserListingsCounts: (props?: GetUserListingsMinProps, headers?: HeadersInit) => Promise<BasicResult<ListingsCounts>>;
    getUserCollectionListings: (props: GetUserCollectionListingsProps, headers?: HeadersInit) => Promise<BasicResult<Listing[]>>;
    getUserCollectionListingsCounts: (props: GetUserCollectionListingsProps, headers?: HeadersInit) => Promise<BasicResult<ListingsCounts>>;
    getUserSales: (props?: GetUserHistoryProps, headers?: HeadersInit) => Promise<BasicResult<Listing[]>>;
    getUserSalesCounts: (props?: GetUserHistoryProps, headers?: HeadersInit) => Promise<BasicResult<ListingsCounts>>;
    getUserPurchases: (props?: GetUserHistoryProps, headers?: HeadersInit) => Promise<BasicResult<Listing[]>>;
    getUserPurchasesCounts: (props?: GetUserHistoryProps, headers?: HeadersInit) => Promise<BasicResult<ListingsCounts>>;
    collection: (props: ListingCollectionProps, headers?: HeadersInit) => Promise<BasicResult<Listing[] | ListingsCounts | ListingsStats>>;
    getCollectionListings: (props: GetCollectionListingsProps, headers?: HeadersInit) => Promise<BasicResult<Listing[]>>;
    getCollectionsListings: (props: GetCollectionsListingsProps, headers?: HeadersInit) => Promise<BasicResult<Listing[]>>;
    getCollectionListingsCounts: (props: GetCollectionListingsProps, headers?: HeadersInit) => Promise<BasicResult<ListingsCounts>>;
    getCollectionsListingsCounts: (props: GetCollectionsListingsProps, headers?: HeadersInit) => Promise<BasicResult<ListingsCounts>>;
    getCollectionListingsStats: (props: GetCollectionListingsProps, headers?: HeadersInit) => Promise<BasicResult<ListingsStats>>;
    getCollectionsListingsStats: (props: GetCollectionsListingsProps, headers?: HeadersInit) => Promise<BasicResult<ListingsStats>>;
    app: (props: ListingAppProps, headers?: HeadersInit) => Promise<BasicResult<Listing[] | ListingsCounts | ListingsStats>>;
    getAppListings: (props: GetAppListingsProps, headers?: HeadersInit) => Promise<BasicResult<Listing[]>>;
    getAppListingsCounts: (props: GetAppListingsProps, headers?: HeadersInit) => Promise<BasicResult<ListingsCounts>>;
    getAppListingsStats: (props: GetAppListingsProps, headers?: HeadersInit) => Promise<BasicResult<ListingsStats>>;
    new: (props: ListingNewProps, headers?: HeadersInit) => Promise<BasicResult<CreateListingResponseBody | string[]>>;
    listAsset: (props: ListAssetProps, headers?: HeadersInit) => Promise<BasicResult<CreateListingResponseBody>>;
    listAssets: (props: ListAssetsProps, headers?: HeadersInit) => Promise<BasicResult<string[]>>;
    listCollectionAssets: (props: ListCollectionAssetsProps, headers?: HeadersInit) => Promise<BasicResult<string[]>>;
    updateListing: (props: UpdateListingProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    buyListing: (props: BuyListingProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    removeListing: (props: RemoveListingProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
};