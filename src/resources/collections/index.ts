import { Base } from '../base';
import { Collection, CollectionUpdate } from './types';

export class Collections extends Base {
  getCollection(id: string): Promise<Collection> {
    return this.request(`/collection/info?collectionId=${id}`);
  }
  getCollections(ids: string[]): Promise<Collection[]> {
    return this.request(`/collection/info?collectionIds=${ids}`);
  }
  updateCollection(update: CollectionUpdate): Promise<boolean> {
    return this.request('/collection/update', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }

  // /activate
  // /deactivate
  // /image
  // /new
  // /nfts
}