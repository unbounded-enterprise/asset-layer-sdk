import { Base } from './base';
import { GetAppListingsProps, GetCollectionListingsProps, GetUserListingsProps, Listing, CreateListingProps, UpdateListingProps, GetListingProps, BuyListingProps, RemoveListingProps, RawListingsHandlers, SafeListingsHandlers, CreateListingsProps, CreateCollectionListingsProps, CreateListingAllProps } from '../types/listing';
import { propsToQueryString } from 'src/utils/basic-format';
import { parseBasicError } from 'src/utils/basic-error';

export class Listings extends Base {
  getListing = async (props: GetListingProps, headers?: HeadersInit) => ((await this.raw.getListing(props, headers)).body.listing);
  getUserListings = async (props: GetUserListingsProps, headers?: HeadersInit) => ((await this.raw.getUserListings(props, headers)).body.listings);
  getCollectionListings = async (props: GetCollectionListingsProps, headers?: HeadersInit) => ((await this.raw.getCollectionListings(props, headers)).body.listing);
  getAppListings = async (props: GetAppListingsProps, headers?: HeadersInit) => ((await this.raw.getAppListings(props, headers)).body.listing);
  create = async (props: CreateListingAllProps, headers?: HeadersInit) => (((await this.raw.create(props, headers)).body as any)[(props.collectionId || props.assetIds) ? 'assetIds' : 'listing']);
  createListing = async (props: CreateListingProps, headers?: HeadersInit) => ((await this.raw.createListing(props, headers)).body.listing);
  createListings = async (props: CreateListingsProps, headers?: HeadersInit) => ((await this.raw.createListings(props, headers)).body.assetIds);
  createCollectionListings = async (props: CreateCollectionListingsProps, headers?: HeadersInit) => ((await this.raw.createCollectionListings(props, headers)).body.assetIds);
  updateListing = async (props: UpdateListingProps, headers?: HeadersInit) => ((await this.raw.updateListing(props, headers)).success);
  buyListing = async (props: BuyListingProps, headers?: HeadersInit) => ((await this.raw.buyListing(props, headers)).success);
  removeListing = async (props: RemoveListingProps, headers?: HeadersInit) => ((await this.raw.removeListing(props, headers)).success);

  raw: RawListingsHandlers = {
    getListing: async (props, headers) => this.request('/listing/info' + propsToQueryString(props), { headers }),
    getUserListings: async (props, headers) => this.request('/listing/user' + propsToQueryString(props), { headers }),
    getCollectionListings: async (props, headers) => this.request('/listing/collection' + propsToQueryString(props), { headers }),
    getAppListings: async (props, headers) => this.request('/listing/app' + propsToQueryString(props), { headers }),
    create: async (props, headers) => this.request('/listing/new', { method: 'PUT', body: JSON.stringify(props), headers }),
    createListing: async (props, headers) => this.request('/listing/new', { method: 'PUT', body: JSON.stringify(props), headers }),
    createListings: async (props, headers) => this.request('/listing/new', { method: 'PUT', body: JSON.stringify(props), headers }),
    createCollectionListings: async (props, headers) => this.request('/listing/new', { method: 'PUT', body: JSON.stringify(props), headers }),
    updateListing: async (props, headers) => this.request('/listing/update', { method: 'PUT', body: JSON.stringify(props), headers }),
    buyListing: async (props, headers) => this.request('/listing/buy', { method: 'PUT', body: JSON.stringify(props), headers }),
    removeListing: async (props, headers) => this.request('/listing', { method: 'DELETE', body: JSON.stringify(props), headers }),
  };

  safe: SafeListingsHandlers = {
    getListing: async (props, headers) => {
      try { return { result: await this.getListing(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserListings: async (props, headers) => {
      try { return { result: await this.getUserListings(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionListings: async (props, headers) => {
      try { return { result: await this.getCollectionListings(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppListings: async (props, headers) => {
      try { return { result: await this.getAppListings(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    create: async (props, headers) => {
      try { return { result: await this.create(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    createListing: async (props, headers) => {
      try { return { result: await this.createListing(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    createListings: async (props, headers) => {
      try { return { result: await this.createListings(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    createCollectionListings: async (props, headers) => {
      try { return { result: await this.createCollectionListings(props, headers) }; }
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