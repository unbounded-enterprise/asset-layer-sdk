export type ListingStatus = 'deleted' | 'cancelled' | 'active' | 'inactive' | 'sold';
export type ListingUpdateStatus = 'active' | 'inactive';

export type Listing = {
  
};

export type CreateListingProps = {
    handle: string;
    price: number;
    nftId?: string;
    nftIds?: string[];
    collectionId?: string;
    liveTime?: number;
    status?: ListingUpdateStatus;
}

export type UpdateListingProps = {
    listingId: string;
    handle: string;
    price?: number;
    liveTime?: number;
    status?: ListingUpdateStatus;
}

export type GetAppListingsProps = {
    appId: string;
    status?: ListingStatus;
    lastUpdatedAt?: number;
    countsOnly?: boolean;
    collectionStats?: boolean;
}

export type GetCollectionListingsProps = {
    collectionId?: string;
    collectionIds?: string;
    status?: ListingStatus;
    lastUpdatedAt?: number;
    countsOnly?: boolean;
    collectionStats?: boolean;
}

export type GetUserListingsProps = {
    handle: string;
    sellerOnly?: boolean;
    buyerOnly?: boolean;
    status?: ListingStatus;
    collectionId?: string;
    countsOnly?: boolean;
}