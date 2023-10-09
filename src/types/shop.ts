import { BasicResponse, BasicResult, BasicSuccessResponse } from "./basic-types";

export type NewItemProps = {
    collectionId: string;
    price: number;
    currencyId?: string;
    currency?: string;
    paymentUserId?: string;
};

export type BuyItemProps = {
    itemId: string;
    // price: number;
    // currencyId?: string;
    // currency?: string;
};

export type RemoveItemProps = {
    itemId: string;
};


export type NewItemResponseData = {
    itemId: string;
    collectionId: string;
    currencyId: string;
    currency: string;
    price: number;
};

export type BuyItemResponse = BasicSuccessResponse & { buy: boolean; };

export type ShopItemSummary = {
    itemId: string;
    collectionId: string;
    collectionName: string;
    currencyId: string;
    currency: string;
    price: number;
    appId: string;
    paymentUserId: string;
};

export type RawShopHandlers = {
    // newItem: (props: NewItemProps, headers?: HeadersInit) => Promise<BasicResponse<{ newItem: NewItemResponseData; }>>;
    buyItem: (props: BuyItemProps, headers?: HeadersInit) => Promise<BuyItemResponse>;
    summary: (headers?: HeadersInit) => Promise<BasicResponse<{ summary: ShopItemSummary; }>>;
    // removeItem: (props: RemoveItemProps, headers?: HeadersInit) => Promise<BasicSuccessResponse>;
};

export type SafeShopHandlers = {
    // newItem: (props: NewItemProps, headers?: HeadersInit) => Promise<BasicResult<NewItemResponseData>>;
    buyItem: (props: BuyItemProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
    summary: (headers?: HeadersInit) => Promise<BasicResult<ShopItemSummary>>;
    // removeItem: (props: RemoveItemProps, headers?: HeadersInit) => Promise<BasicResult<boolean>>;
};