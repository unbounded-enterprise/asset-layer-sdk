import { Base } from './base';
import { GetAppListingsProps, GetCollectionListingsProps, GetUserListingsProps, Listing, CreateListingProps, UpdateListingProps, GetListingProps, BuyListingProps, RemoveListingProps, RawListingsHandlers, SafeListingsHandlers, CreateListingsProps, CreateCollectionListingsProps } from '../types/listing';
import { propsToQueryString } from 'src/utils/basic-format';
import { parseBasicError } from 'src/utils/basic-error';

export class Listings extends Base {
  getListing = async (props: GetListingProps) => ((await this.raw.getListing(props)).body.listing);
  getUserListings = async (props: GetUserListingsProps) => ((await this.raw.getUserListings(props)).body.listings);
  getCollectionListings = async (props: GetCollectionListingsProps) => ((await this.raw.getCollectionListings(props)).body.listing);
  getAppListings = async (props: GetAppListingsProps) => ((await this.raw.getAppListings(props)).body.listing);
  createListing = async (props: CreateListingProps) => ((await this.raw.createListing(props)).body.listing);
  createListings = async (props: CreateListingsProps) => ((await this.raw.createListings(props)).body.assetIds);
  createCollectionListings = async (props: CreateCollectionListingsProps) => ((await this.raw.createCollectionListings(props)).body.assetIds);
  updateListing = async (props: UpdateListingProps) => ((await this.raw.updateListing(props)).success);
  buyListing = async (props: BuyListingProps) => ((await this.raw.buyListing(props)).success);
  removeListing = async (props: RemoveListingProps) => ((await this.raw.removeListing(props)).success);

  raw: RawListingsHandlers = {
    getListing: async (props) => this.request('/listing/info' + propsToQueryString(props)),
    getUserListings: async (props) => this.request('/listing/user' + propsToQueryString(props)),
    getCollectionListings: async (props) => this.request('/listing/collection' + propsToQueryString(props)),
    getAppListings: async (props) => this.request('/listing/app' + propsToQueryString(props)),
    createListing: async (props) => this.request('/listing/new', { method: 'PUT', body: JSON.stringify(props) }),
    createListings: async (props) => this.request('/listing/new', { method: 'PUT', body: JSON.stringify(props) }),
    createCollectionListings: async (props) => this.request('/listing/new', { method: 'PUT', body: JSON.stringify(props) }),
    updateListing: async (props) => this.request('/listing/update', { method: 'PUT', body: JSON.stringify(props) }),
    buyListing: async (props) => this.request('/listing/buy', { method: 'PUT', body: JSON.stringify(props) }),
    removeListing: async (props) => this.request('/listing', { method: 'DELETE', body: JSON.stringify(props) }),
  };

  safe: SafeListingsHandlers = {
    getListing: async (props) => {
      try { return { result: await this.getListing(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserListings: async (props) => {
      try { return { result: await this.getUserListings(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionListings: async (props) => {
      try { return { result: await this.getCollectionListings(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAppListings: async (props) => {
      try { return { result: await this.getAppListings(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    createListing: async (props) => {
      try { return { result: await this.createListing(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    createListings: async (props) => {
      try { return { result: await this.createListings(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    createCollectionListings: async (props) => {
      try { return { result: await this.createCollectionListings(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateListing: async (props) => {
      try { return { result: await this.updateListing(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    buyListing: async (props) => {
      try { return { result: await this.buyListing(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    removeListing: async (props) => {
      try { return { result: await this.removeListing(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}