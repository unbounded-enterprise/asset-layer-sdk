import { AssetLayerRequestOptions } from "src/resources/base";
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
    price: number;
    currencyId?: string;
    currency?: string;
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

export type BuyItemResponse = BasicResponse<BuyItemBody>;
export type BuyItemBody = { buy: boolean; assetId: string; };

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
    // newItem: (props: NewItemProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResponse<{ newItem: NewItemResponseData; }>>;
    buyItem: (props: BuyItemProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BuyItemResponse>;
    summary: (headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResponse<{ summary: ShopItemSummary; }>>;
    // removeItem: (props: RemoveItemProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicSuccessResponse>;
};

export type SafeShopHandlers = {
    // newItem: (props: NewItemProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<NewItemResponseData>>;
    buyItem: (props: BuyItemProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<string>>;
    summary: (headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<ShopItemSummary>>;
    // removeItem: (props: RemoveItemProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => Promise<BasicResult<boolean>>;
};