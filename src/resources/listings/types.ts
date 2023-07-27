export declare type ListingStatus = 'deleted' | 'cancelled' | 'active' | 'inactive' | 'sold';
export declare type ListingUpdateStatus = 'active' | 'inactive';

export declare type Listing = {
  
};

export declare type CreateListingProps = {
    handle: string;
    price: number;
    nftId?: string;
    nftIds?: string[];
    collectionId?: string;
    liveTime?: number;
    status?: ListingUpdateStatus;
}

export declare type UpdateListingProps = {
    listingId: string;
    handle: string;
    price?: number;
    liveTime?: number;
    status?: ListingUpdateStatus;
}

export declare type GetAppListingsProps = {
    appId: string;
    status?: ListingStatus;
    lastUpdatedAt?: number;
    countsOnly?: boolean;
    collectionStats?: boolean;
}

export declare type GetCollectionListingsProps = {
    collectionId?: string;
    collectionIds?: string;
    status?: ListingStatus;
    lastUpdatedAt?: number;
    countsOnly?: boolean;
    collectionStats?: boolean;
}

export declare type GetUserListingsProps = {
    handle: string;
    sellerOnly?: boolean;
    buyerOnly?: boolean;
    status?: ListingStatus;
    collectionId?: string;
    countsOnly?: boolean;
}