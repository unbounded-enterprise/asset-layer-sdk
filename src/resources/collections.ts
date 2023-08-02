import { Asset } from '../types/asset';
import { Base } from './base';
import { ActivateCollectionProps, Collection, CreateCollectionProps, CreateCollectionResponse, GetCollectionAssetsProps, GetCollectionAssetsResponse, GetCollectionProps, GetCollectionsProps, GetCollectionsResponse, RawCollectionsHandlers, SafeCollectionsHandlers, UpdateCollectionImageProps, UpdateCollectionProps } from '../types/collection';
import { propsToQueryString } from 'src/utils/basic-format';
import { BasicResult, BasicResultError, BasicResultSuccess, BasicSuccessResponse } from 'src/types/basic-types';
import { parseBasicError } from 'src/utils/basic-error';

export class Collections extends Base {
  getCollection = async (props: GetCollectionProps) => ((await this.raw.getCollection(props)).body.collections[0]);
  getCollections = async (props: GetCollectionsProps) => ((await this.raw.getCollections(props)).body.collections);
  getCollectionAssets = async (props: GetCollectionAssetsProps) => ((await this.raw.getCollectionAssets(props)).body.collection.assets);
  createCollection = async (props: CreateCollectionProps) => ((await this.raw.createCollection(props)).body.collectionId);
  updateCollectionImage = async (props: UpdateCollectionImageProps) => ((await this.raw.updateCollectionImage(props)).success);
  updateCollection = async (props: UpdateCollectionProps) => ((await this.raw.updateCollection(props)).success);
  activateCollection = async (props: ActivateCollectionProps) => ((await this.raw.activateCollection(props)).success);
  deactivateCollection = async (props: ActivateCollectionProps) => ((await this.raw.deactivateCollection(props)).success);

  raw: RawCollectionsHandlers = {
    getCollection: async (props) => this.request('/collection/info' + propsToQueryString(props)),
    getCollections: async (props) => this.request('/collection/info' + propsToQueryString(props)),
    getCollectionAssets: async (props) => this.request('/collection/nfts' + propsToQueryString(props)),
    createCollection: async (props) => this.request('/collection/new', { method: 'POST', body: JSON.stringify(props) }),
    updateCollectionImage: async (props) => this.request('/collection/image', { method: 'POST', body: JSON.stringify(props) }),
    updateCollection: async (props) => this.request('/collection/update', { method: 'PUT', body: JSON.stringify(props) }),
    activateCollection: async (props) => this.request('/collection/activate', { method: 'PUT', body: JSON.stringify(props) }),
    deactivateCollection: async (props) => this.request('/collection/deactivate', { method: 'PUT', body: JSON.stringify(props) }),
  };

  safe: SafeCollectionsHandlers = {
    getCollection: async (props) => {
      try { return { result: await this.getCollection(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollections: async (props) => {
      try { return { result: await this.getCollections(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionAssets: async (props) => {
      try { return { result: await this.getCollectionAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    createCollection: async (props) => {
      try { return { result: await this.createCollection(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateCollectionImage: async (props) => {
      try { return { result: await this.updateCollectionImage(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateCollection: async (props) => {
      try { return { result: await this.updateCollection(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    activateCollection: async (props) => {
      try { return { result: await this.activateCollection(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    deactivateCollection: async (props) => {
      try { return { result: await this.deactivateCollection(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}