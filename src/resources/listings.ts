import type { GetAppListingsProps, GetCollectionListingsProps, GetUserListingsProps, ListAssetProps, UpdateListingProps, GetListingProps, BuyListingProps, RemoveListingProps, RawListingsHandlers, SafeListingsHandlers, ListAssetsProps, ListCollectionAssetsProps, ListingNewProps, ListingAppProps, ListingUserProps, ListingCollectionProps, GetCollectionsListingsProps, GetUserCollectionListingsProps, GetUserHistoryProps, GetUserListingsMinProps } from '../types/listing';
import { AssetLayerRequestOptions, Base } from './base';
import { propsToQueryString } from '../utils/basic-format';
import { parseBasicError } from '../utils/basic-error';

export class Listings extends Base {
  getListing = async (props: GetListingProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getListing(props, headers, options)).body.listing);
  user = async (props?: ListingUserProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.user(props, headers, options)).body.listings);
  getUserListings = async (props?: GetUserListingsMinProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getUserListings(props, headers, options)).body.listings);
  getUserListingsCounts = async (props?: GetUserListingsMinProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getUserListingsCounts(props, headers, options)).body.listings);
  getUserCollectionListings = async (props: GetUserCollectionListingsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getUserCollectionListings(props, headers, options)).body.listings);
  getUserCollectionListingsCounts = async (props: GetUserCollectionListingsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getUserCollectionListingsCounts(props, headers, options)).body.listings);
  getUserSales = async (props?: GetUserHistoryProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getUserSales(props, headers, options)).body.listings);
  getUserSalesCounts = async (props?: GetUserHistoryProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getUserSalesCounts(props, headers, options)).body.listings);
  getUserPurchases = async (props?: GetUserHistoryProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getUserPurchases(props, headers, options)).body.listings);
  getUserPurchasesCounts = async (props?: GetUserHistoryProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getUserPurchasesCounts(props, headers, options)).body.listings);
  collection = async (props: ListingCollectionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.collection(props, headers, options)).body.listing);
  getCollectionListings = async (props: GetCollectionListingsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getCollectionListings(props, headers, options)).body.listing);
  getCollectionsListings = async (props: GetCollectionsListingsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getCollectionsListings(props, headers, options)).body.listing);
  getCollectionListingsCounts = async (props: GetCollectionListingsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getCollectionListingsCounts(props, headers, options)).body.listing);
  getCollectionsListingsCounts = async (props: GetCollectionsListingsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getCollectionsListingsCounts(props, headers, options)).body.listing);
  getCollectionListingsStats = async (props: GetCollectionListingsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getCollectionListingsStats(props, headers, options)).body.listing);
  getCollectionsListingsStats = async (props: GetCollectionsListingsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getCollectionsListingsStats(props, headers, options)).body.listing);
  app = async (props: ListingAppProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.app(props, headers, options)).body.listing);
  getAppListings = async (props: GetAppListingsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getAppListings(props, headers, options)).body.listing);
  getAppListingsCounts = async (props: GetAppListingsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getAppListingsCounts(props, headers, options)).body.listing);
  getAppListingsStats = async (props: GetAppListingsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getAppListingsStats(props, headers, options)).body.listing);
  new = async (props: ListingNewProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => (((await this.raw.new(props, headers, options)).body as any)[(props.collectionId || props.assetIds) ? 'assetIds' : 'listing']);
  listAsset = async (props: ListAssetProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.listAsset(props, headers, options)).body.listing);
  listAssets = async (props: ListAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.listAssets(props, headers, options)).body.assetIds);
  listCollectionAssets = async (props: ListCollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.listCollectionAssets(props, headers, options)).body.assetIds);
  updateListing = async (props: UpdateListingProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.updateListing(props, headers, options)).success);
  buyListing = async (props: BuyListingProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.buyListing(props, headers, options)).success);
  removeListing = async (props: RemoveListingProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.removeListing(props, headers, options)).success);

  raw: RawListingsHandlers = {
    getListing: async (props, headers, options) => this.request('/listing/info' + propsToQueryString(props), { headers }, options),
    user: async (props, headers, options) => this.request('/listing/user' + propsToQueryString(props), { headers }, options),
    getUserListings: async (props, headers, options) => this.request('/listing/user' + propsToQueryString({ status: 'active', ...props, sellerOnly: true }), { headers }, options),
    getUserListingsCounts: async (props, headers, options) => this.request('/listing/user' + propsToQueryString({ status: 'active', ...props, sellerOnly: true, countsOnly: true }), { headers }, options),
    getUserCollectionListings: async (props, headers, options) => this.request('/listing/user' + propsToQueryString({ status: 'active', ...props, sellerOnly: true }), { headers }, options),
    getUserCollectionListingsCounts: async (props, headers, options) => this.request('/listing/user' + propsToQueryString({ status: 'active', ...props, sellerOnly: true, countsOnly: true }), { headers }, options),
    getUserSales: async (props, headers, options) => this.request('/listing/user' + propsToQueryString({ ...props, sellerOnly: true, status: 'sold' }), { headers }, options),
    getUserSalesCounts: async (props, headers, options) => this.request('/listing/user' + propsToQueryString({ ...props, sellerOnly: true, status: 'sold', countsOnly: true }), { headers }, options),
    getUserPurchases: async (props, headers, options) => this.request('/listing/user' + propsToQueryString({ ...props, buyerOnly: true, status: 'sold' }), { headers }, options),
    getUserPurchasesCounts: async (props, headers, options) => this.request('/listing/user' + propsToQueryString({ ...props, buyerOnly: true, status: 'sold', countsOnly: true }), { headers }, options),
    collection: async (props, headers, options) => this.request('/listing/collection' + propsToQueryString(props), { headers }, options),
    getCollectionListings: async (props, headers, options) => this.request('/listing/collection' + propsToQueryString(props), { headers }, options),
    getCollectionsListings: async (props, headers, options) => this.request('/listing/collection' + propsToQueryString(props), { headers }, options),
    getCollectionListingsCounts: async (props, headers, options) => this.request('/listing/collection' + propsToQueryString({ ...props, countsOnly: true }), { headers }, options),
    getCollectionsListingsCounts: async (props, headers, options) => this.request('/listing/collection' + propsToQueryString({ ...props, countsOnly: true }), { headers }, options),
    getCollectionListingsStats: async (props, headers, options) => this.request('/listing/collection' + propsToQueryString({ ...props, countsOnly: true, collectionStats: true }), { headers }, options),
    getCollectionsListingsStats: async (props, headers, options) => this.request('/listing/collection' + propsToQueryString({ ...props, countsOnly: true, collectionStats: true }), { headers }, options),
    app: async (props, headers, options) => this.request('/listing/app' + propsToQueryString(props), { headers }, options),
    getAppListings: async (props, headers, options) => this.request('/listing/app' + propsToQueryString(props), { headers }, options),
    getAppListingsCounts: async (props, headers, options) => this.request('/listing/app' + propsToQueryString({ ...props, countsOnly: true }), { headers }, options),
    getAppListingsStats: async (props, headers, options) => this.request('/listing/app' + propsToQueryString({ ...props, countsOnly: true, collectionStats: true }), { headers }, options),
    new: async (props, headers, options) => this.request('/listing/new', { method: 'POST', body: JSON.stringify(props), headers }, options),
    listAsset: async (props, headers, options) => this.request('/listing/new', { method: 'POST', body: JSON.stringify(props), headers }, options),
    listAssets: async (props, headers, options) => this.request('/listing/new', { method: 'POST', body: JSON.stringify(props), headers }, options),
    listCollectionAssets: async (props, headers, options) => this.request('/listing/new', { method: 'POST', body: JSON.stringify(props), headers }, options),
    updateListing: async (props, headers, options) => this.request('/listing/update', { method: 'PUT', body: JSON.stringify(props), headers }, options),
    buyListing: async (props, headers, options) => this.request('/listing/buy', { method: 'POST', body: JSON.stringify(props), headers }, options),
    removeListing: async (props, headers, options) => this.request('/listing', { method: 'DELETE', body: JSON.stringify(props), headers }, options),
  };

  safe: SafeListingsHandlers = {
    getListing: async (props, headers, options) => {
      try { return { result: await this.getListing(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    user: async (props, headers, options) => {
      try { return { result: await this.user(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserListings: async (props, headers, options) => {
      try { return { result: await this.getUserListings(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserListingsCounts: async (props, headers, options) => {
      try { return { result: await this.getUserListingsCounts(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserCollectionListings: async (props, headers, options) => {
      try { return { result: await this.getUserCollectionListings(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserCollectionListingsCounts: async (props, headers, options) => {
      try { return { result: await this.getUserCollectionListingsCounts(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserSales: async (props, headers, options) => {
      try { return { result: await this.getUserSales(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserSalesCounts: async (props, headers, options) => {
      try { return { result: await this.getUserSalesCounts(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserPurchases: async (props, headers, options) => {
      try { return { result: await this.getUserPurchases(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserPurchasesCounts: async (props, headers, options) => {
      try { return { result: await this.getUserPurchasesCounts(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    collection: async (props, headers, options) => {
      try { return { result: await this.collection(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionListings: async (props, headers, options) => {
      try { return { result: await this.getCollectionListings(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionsListings: async (props, headers, options) => {
      try { return { result: await this.getCollectionsListings(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionListingsCounts: async (props, headers, options) => {
      try { return { result: await this.getCollectionListingsCounts(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionsListingsCounts: async (props, headers, options) => {
      try { return { result: await this.getCollectionsListingsCounts(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionListingsStats: async (props, headers, options) => {
      try { return { result: await this.getCollectionListingsStats(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionsListingsStats: async (props, headers, options) => {
      try { return { result: await this.getCollectionsListingsStats(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    app: async (props, headers, options) => {
      try { return { result: await this.app(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppListings: async (props, headers, options) => {
      try { return { result: await this.getAppListings(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppListingsCounts: async (props, headers, options) => {
      try { return { result: await this.getAppListingsCounts(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppListingsStats: async (props, headers, options) => {
      try { return { result: await this.getAppListingsStats(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    new: async (props, headers, options) => {
      try { return { result: await this.new(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    listAsset: async (props, headers, options) => {
      try { return { result: await this.listAsset(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    listAssets: async (props, headers, options) => {
      try { return { result: await this.listAssets(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    listCollectionAssets: async (props, headers, options) => {
      try { return { result: await this.listCollectionAssets(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateListing: async (props, headers, options) => {
      try { return { result: await this.updateListing(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    buyListing: async (props, headers, options) => {
      try { return { result: await this.buyListing(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    removeListing: async (props, headers, options) => {
      try { return { result: await this.removeListing(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}