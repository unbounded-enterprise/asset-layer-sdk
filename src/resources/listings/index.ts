import { Base } from '../base';
import { Listing, ListingUpdate } from './types';

export class Listings extends Base {
  getListing(id: string): Promise<Listing> {
    return this.request(`/listing/info?listingId=${id}`);
  }
  /*
  getListings(ids: string[]): Promise<Listing[]> {
    return this.request(`/listing/info?listingIds=${ids}`);
  }
  */
  updateListing(update: ListingUpdate): Promise<boolean> {
    return this.request('/listing/update', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
  // /app
  // /buy
  // /collection
  // /new
  // /remove
  // /user
}