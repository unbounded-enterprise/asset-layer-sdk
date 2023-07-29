import { Asset } from '../types/asset';
import { Base } from './base';
import { Collection, CreateCollectionProps, UpdateCollectionProps } from '../types/collection';
import { propsToQueryString } from 'src/utils/basic-format';

export class Collections extends Base {
  getCollection(collectionId: string): Promise<Collection> {
    return this.request(`/collection/info?collectionId=${collectionId}`);
  }
  getCollections(collectionIds: string[]): Promise<Collection[]> {
    return this.request('/collection/info' + propsToQueryString({ collectionIds }));
  }
  getCollectionAssets(collectionId: string, serials: string = '', idOnly: boolean = false): Promise<Asset[]> {
    return this.request(`/collection/nfts?collectionId=${collectionId}&serials=${serials}&idOnly=${idOnly}`);
  }
  createCollection(update: CreateCollectionProps): Promise<boolean> {
    return this.request('/collection/new', {
      method: 'POST',
      body: JSON.stringify(update),
    });
  }
  updateCollectionImage(collectionId: string, value: string): Promise<boolean> {
    return this.request('/collection/image', {
      method: 'POST',
      body: JSON.stringify({ collectionId, value }),
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
}