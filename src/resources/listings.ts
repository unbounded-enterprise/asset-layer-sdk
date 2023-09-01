import type { GetAppListingsProps, GetCollectionListingsProps, GetUserListingsProps, ListAssetProps, UpdateListingProps, GetListingProps, BuyListingProps, RemoveListingProps, RawListingsHandlers, SafeListingsHandlers, ListAssetsProps, ListCollectionAssetsProps, CreateListingAllProps, GetAppListingsAllProps, GetUserListingsAllProps, GetCollectionsListingsAllProps, GetCollectionsListingsProps, GetUserCollectionListingsProps, GetUserHistoryProps, GetUserListingsMinProps } from '../types/listing';
import { Base } from './base';
import { propsToQueryString } from '../utils/basic-format';
import { parseBasicError } from '../utils/basic-error';

export class Listings extends Base {
  getListing = async (props: GetListingProps, headers?: HeadersInit) => ((await this.raw.getListing(props, headers)).body.listing);
  user = async (props?: GetUserListingsAllProps, headers?: HeadersInit) => ((await this.raw.user(props, headers)).body.listings);
  getUserListings = async (props?: GetUserListingsMinProps, headers?: HeadersInit) => ((await this.raw.getUserListings(props, headers)).body.listings);
  getUserListingsCounts = async (props?: GetUserListingsMinProps, headers?: HeadersInit) => ((await this.raw.getUserListingsCounts(props, headers)).body.listings);
  getUserCollectionListings = async (props: GetUserCollectionListingsProps, headers?: HeadersInit) => ((await this.raw.getUserCollectionListings(props, headers)).body.listings);
  getUserCollectionListingsCounts = async (props: GetUserCollectionListingsProps, headers?: HeadersInit) => ((await this.raw.getUserCollectionListingsCounts(props, headers)).body.listings);
  getUserSales = async (props?: GetUserHistoryProps, headers?: HeadersInit) => ((await this.raw.getUserSales(props, headers)).body.listings);
  getUserSalesCounts = async (props?: GetUserHistoryProps, headers?: HeadersInit) => ((await this.raw.getUserSalesCounts(props, headers)).body.listings);
  getUserPurchases = async (props?: GetUserHistoryProps, headers?: HeadersInit) => ((await this.raw.getUserPurchases(props, headers)).body.listings);
  getUserPurchasesCounts = async (props?: GetUserHistoryProps, headers?: HeadersInit) => ((await this.raw.getUserPurchasesCounts(props, headers)).body.listings);
  collection = async (props: GetCollectionsListingsAllProps, headers?: HeadersInit) => ((await this.raw.collection(props, headers)).body.listing);
  getCollectionListings = async (props: GetCollectionListingsProps, headers?: HeadersInit) => ((await this.raw.getCollectionListings(props, headers)).body.listing);
  getCollectionsListings = async (props: GetCollectionsListingsProps, headers?: HeadersInit) => ((await this.raw.getCollectionsListings(props, headers)).body.listing);
  getCollectionListingsCounts = async (props: GetCollectionListingsProps, headers?: HeadersInit) => ((await this.raw.getCollectionListingsCounts(props, headers)).body.listing);
  getCollectionsListingsCounts = async (props: GetCollectionsListingsProps, headers?: HeadersInit) => ((await this.raw.getCollectionsListingsCounts(props, headers)).body.listing);
  app = async (props: GetAppListingsAllProps, headers?: HeadersInit) => ((await this.raw.app(props, headers)).body.listing);
  getAppListings = async (props: GetAppListingsProps, headers?: HeadersInit) => ((await this.raw.getAppListings(props, headers)).body.listing);
  getAppListingsCounts = async (props: GetAppListingsProps, headers?: HeadersInit) => ((await this.raw.getAppListingsCounts(props, headers)).body.listing);
  getAppListingsStats = async (props: GetAppListingsProps, headers?: HeadersInit) => ((await this.raw.getAppListingsStats(props, headers)).body.listing);
  new = async (props: CreateListingAllProps, headers?: HeadersInit) => (((await this.raw.new(props, headers)).body as any)[(props.collectionId || props.assetIds) ? 'assetIds' : 'listing']);
  listAsset = async (props: ListAssetProps, headers?: HeadersInit) => ((await this.raw.listAsset(props, headers)).body.listing);
  listAssets = async (props: ListAssetsProps, headers?: HeadersInit) => ((await this.raw.listAssets(props, headers)).body.assetIds);
  listCollectionAssets = async (props: ListCollectionAssetsProps, headers?: HeadersInit) => ((await this.raw.listCollectionAssets(props, headers)).body.assetIds);
  updateListing = async (props: UpdateListingProps, headers?: HeadersInit) => ((await this.raw.updateListing(props, headers)).success);
  buyListing = async (props: BuyListingProps, headers?: HeadersInit) => ((await this.raw.buyListing(props, headers)).success);
  removeListing = async (props: RemoveListingProps, headers?: HeadersInit) => ((await this.raw.removeListing(props, headers)).success);

  raw: RawListingsHandlers = {
    getListing: async (props, headers) => this.request('/listing/info' + propsToQueryString(props), { headers }),
    user: async (props, headers) => this.request('/listing/user' + propsToQueryString(props), { headers }),
    getUserListings: async (props, headers) => this.request('/listing/user' + propsToQueryString({ status: 'active', ...props, sellerOnly: true }), { headers }),
    getUserListingsCounts: async (props, headers) => this.request('/listing/user' + propsToQueryString({ status: 'active', ...props, sellerOnly: true, countsOnly: true }), { headers }),
    getUserCollectionListings: async (props, headers) => this.request('/listing/user' + propsToQueryString({ status: 'active', ...props, sellerOnly: true }), { headers }),
    getUserCollectionListingsCounts: async (props, headers) => this.request('/listing/user' + propsToQueryString({ status: 'active', ...props, sellerOnly: true, countsOnly: true }), { headers }),
    getUserSales: async (props, headers) => this.request('/listing/user' + propsToQueryString({ ...props, sellerOnly: true, status: 'sold' }), { headers }),
    getUserSalesCounts: async (props, headers) => this.request('/listing/user' + propsToQueryString({ ...props, sellerOnly: true, status: 'sold', countsOnly: true }), { headers }),
    getUserPurchases: async (props, headers) => this.request('/listing/user' + propsToQueryString({ ...props, buyerOnly: true, status: 'sold' }), { headers }),
    getUserPurchasesCounts: async (props, headers) => this.request('/listing/user' + propsToQueryString({ ...props, buyerOnly: true, status: 'sold', countsOnly: true }), { headers }),
    collection: async (props, headers) => this.request('/listing/collection' + propsToQueryString(props), { headers }),
    getCollectionListings: async (props, headers) => this.request('/listing/collection' + propsToQueryString(props), { headers }),
    getCollectionsListings: async (props, headers) => this.request('/listing/collection' + propsToQueryString(props), { headers }),
    getCollectionListingsCounts: async (props, headers) => this.request('/listing/collection' + propsToQueryString({ ...props, countsOnly: true }), { headers }),
    getCollectionsListingsCounts: async (props, headers) => this.request('/listing/collection' + propsToQueryString({ ...props, countsOnly: true }), { headers }),
    app: async (props, headers) => this.request('/listing/app' + propsToQueryString(props), { headers }),
    getAppListings: async (props, headers) => this.request('/listing/app' + propsToQueryString(props), { headers }),
    getAppListingsCounts: async (props, headers) => this.request('/listing/app' + propsToQueryString({ ...props, countsOnly: true }), { headers }),
    getAppListingsStats: async (props, headers) => this.request('/listing/app' + propsToQueryString({ ...props, countsOnly: true, collectionStats: true }), { headers }),
    new: async (props, headers) => this.request('/listing/new', { method: 'POST', body: JSON.stringify(props), headers }),
    listAsset: async (props, headers) => this.request('/listing/new', { method: 'POST', body: JSON.stringify(props), headers }),
    listAssets: async (props, headers) => this.request('/listing/new', { method: 'POST', body: JSON.stringify(props), headers }),
    listCollectionAssets: async (props, headers) => this.request('/listing/new', { method: 'POST', body: JSON.stringify(props), headers }),
    updateListing: async (props, headers) => this.request('/listing/update', { method: 'PUT', body: JSON.stringify(props), headers }),
    buyListing: async (props, headers) => this.request('/listing/buy', { method: 'POST', body: JSON.stringify(props), headers }),
    removeListing: async (props, headers) => this.request('/listing', { method: 'DELETE', body: JSON.stringify(props), headers }),
  };

  safe: SafeListingsHandlers = {
    getListing: async (props, headers) => {
      try { return { result: await this.getListing(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    user: async (props, headers) => {
      try { return { result: await this.user(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserListings: async (props, headers) => {
      try { return { result: await this.getUserListings(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserListingsCounts: async (props, headers) => {
      try { return { result: await this.getUserListingsCounts(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserCollectionListings: async (props, headers) => {
      try { return { result: await this.getUserCollectionListings(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserCollectionListingsCounts: async (props, headers) => {
      try { return { result: await this.getUserCollectionListingsCounts(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserSales: async (props, headers) => {
      try { return { result: await this.getUserSales(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserSalesCounts: async (props, headers) => {
      try { return { result: await this.getUserSalesCounts(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserPurchases: async (props, headers) => {
      try { return { result: await this.getUserPurchases(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserPurchasesCounts: async (props, headers) => {
      try { return { result: await this.getUserPurchasesCounts(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    collection: async (props, headers) => {
      try { return { result: await this.collection(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionListings: async (props, headers) => {
      try { return { result: await this.getCollectionListings(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionsListings: async (props, headers) => {
      try { return { result: await this.getCollectionsListings(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionListingsCounts: async (props, headers) => {
      try { return { result: await this.getCollectionListingsCounts(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionsListingsCounts: async (props, headers) => {
      try { return { result: await this.getCollectionsListingsCounts(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    app: async (props, headers) => {
      try { return { result: await this.app(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppListings: async (props, headers) => {
      try { return { result: await this.getAppListings(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppListingsCounts: async (props, headers) => {
      try { return { result: await this.getAppListingsCounts(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppListingsStats: async (props, headers) => {
      try { return { result: await this.getAppListingsStats(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    new: async (props, headers) => {
      try { return { result: await this.new(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    listAsset: async (props, headers) => {
      try { return { result: await this.listAsset(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    listAssets: async (props, headers) => {
      try { return { result: await this.listAssets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    listCollectionAssets: async (props, headers) => {
      try { return { result: await this.listCollectionAssets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateListing: async (props, headers) => {
      try { return { result: await this.updateListing(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    buyListing: async (props, headers) => {
      try { return { result: await this.buyListing(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    removeListing: async (props, headers) => {
      try { return { result: await this.removeListing(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}