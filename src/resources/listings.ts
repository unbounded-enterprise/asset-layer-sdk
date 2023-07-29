import { Base } from './base';
import { GetAppListingsProps, GetCollectionListingsProps, GetUserListingsProps, Listing, CreateListingProps, ListingStatus, UpdateListingProps } from '../types/listing';
import { propsToQueryString } from 'src/utils/basic-format';

export class Listings extends Base {
  getListing(id: string, status?: ListingStatus): Promise<Listing> {
    return this.request(`/listing/info?listingId=${id}&status=${status}`);
  }
  /* does not exist
  getListings(ids: string[]): Promise<Listing[]> {
    return this.request(`/listing/info?listingIds=${ids}`);
  }
  */
  getUserListings(props: GetUserListingsProps): Promise<Listing[]> {
    return this.request('/listing/user' + propsToQueryString(props));
  }
  getCollectionListings(props: GetCollectionListingsProps): Promise<Listing[]> {
    return this.request('/listing/collection' + propsToQueryString(props));
  }
  getAppListings(props: GetAppListingsProps): Promise<Listing[]> {
    return this.request('/listing/app' + propsToQueryString(props));
  }
  createListing(update: CreateListingProps): Promise<boolean> {
    return this.request('/listing/new', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
  updateListing(update: UpdateListingProps): Promise<boolean> {
    return this.request('/listing/update', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
  buyListing(listingId: string, handle: string, price?: number): Promise<boolean> {
    return this.request('/listing/buy', {
      method: 'PUT',
      body: JSON.stringify({ listingId, handle, price }),
    });
  }
  removeListing(listingId: string, handle: string): Promise<boolean> {
    return this.request('/listing', {
      method: 'DELETE',
      body: JSON.stringify({ listingId, handle }),
    });
  }
}