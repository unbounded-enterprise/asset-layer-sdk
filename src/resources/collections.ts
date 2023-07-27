import { Asset } from '../types/asset';
import { Base } from './base';
import { Collection, CreateCollectionProps, UpdateCollectionProps } from '../types/collection';

export class Collections extends Base {
  getCollection(id: string): Promise<Collection> {
    return this.request(`/collection/info?collectionId=${id}`);
  }
  getCollections(ids: string[]): Promise<Collection[]> {
    return this.request(`/collection/info?collectionIds=${ids}`);
  }
  getCollectionAssets(id: string, serials: string = '', idOnly: boolean = false): Promise<Asset[]> {
    return this.request(`/collection/nfts?collectionId=${id}&serials=${serials}&idOnly=${idOnly}`);
  }
  createCollection(update: CreateCollectionProps): Promise<boolean> {
    return this.request('/collection/new', {
      method: 'POST',
      body: JSON.stringify(update),
    });
  }
  updateCollection(update: UpdateCollectionProps): Promise<boolean> {
    return this.request('/collection/update', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
  activateCollection(collectionId: string): Promise<boolean> {
    return this.request('/collection/activate', {
      method: 'PUT',
      body: JSON.stringify({ collectionId }),
    });
  }
  deactivateCollection(collectionId: string): Promise<boolean> {
    return this.request('/collection/deactivate', {
      method: 'PUT',
      body: JSON.stringify({ collectionId }),
    });
  }
  updateCollectionImage(collectionId: string, value: string): Promise<boolean> {
    return this.request('/collection/image', {
      method: 'POST',
      body: JSON.stringify({ collectionId, value }),
    });
  }
}