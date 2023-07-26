import { Base } from '../base';
import { GetAppListingsProps, GetCollectionListingsProps, GetUserListingsProps, Listing, ListingCreationProps, ListingStatus, ListingUpdateProps } from './types';

export class Listings extends Base {
  getListing(id: string, status?: ListingStatus): Promise<Listing> {
    return this.request(`/listing/info?listingId=${id}&status=${status}`);
  }
  /* does not exist
  getListings(ids: string[]): Promise<Listing[]> {
    return this.request(`/listing/info?listingIds=${ids}`);
  }
  */
  getAppListings(update: GetAppListingsProps): Promise<Listing[]> {
    return this.request('/listing/app', {
      method: 'GET',
      body: JSON.stringify(update),
    });
  }
  getCollectionListings(update: GetCollectionListingsProps): Promise<Listing[]> {
    return this.request('/listing/collection', {
      method: 'GET',
      body: JSON.stringify(update),
    });
  }
  getUserListings(update: GetUserListingsProps): Promise<Listing[]> {
    return this.request('/listing/user', {
      method: 'GET',
      body: JSON.stringify(update),
    });
  }
  createListing(update: ListingCreationProps): Promise<boolean> {
    return this.request('/listing/new', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
  updateListing(update: ListingUpdateProps): Promise<boolean> {
    return this.request('/listing/update', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
  buyListing(listingId: string, handle: string): Promise<boolean> {
    return this.request('/listing/buy', {
      method: 'PUT',
      body: JSON.stringify({ listingId, handle }),
    });
  }
  removeListing(listingId: string, handle: string): Promise<boolean> {
    return this.request('/listing', {
      method: 'DELETE',
      body: JSON.stringify({ listingId, handle }),
    });
  }
}