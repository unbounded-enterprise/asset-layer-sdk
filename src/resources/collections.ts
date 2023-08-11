import { Base } from './base';
import { ActivateCollectionProps, Collection, CreateCollectionProps, GetCollectionAssetsAllProps, GetCollectionAssetsProps, GetCollectionProps, GetCollectionsAllProps, GetCollectionsProps, RawCollectionsHandlers, SafeCollectionsHandlers, UpdateCollectionImageProps, UpdateCollectionProps } from '../types/collection';
import { propsToQueryString } from '../utils/basic-format';
import { parseBasicError } from '../utils/basic-error';

export class Collections extends Base {
  info = async (props: GetCollectionsAllProps, headers?: HeadersInit) => {
    const response = await this.raw.info(props, headers);
    return (props.collectionIds) ? response.body.collections : response.body.collections[0];
  };
  getCollection = async (props: GetCollectionProps, headers?: HeadersInit) => ((await this.raw.getCollection(props, headers)).body.collections[0]);
  getCollections = async (props: GetCollectionsProps, headers?: HeadersInit) => ((await this.raw.getCollections(props, headers)).body.collections);
  assets = async (props: GetCollectionAssetsAllProps, headers?: HeadersInit) => ((await this.raw.getCollectionAssets(props, headers)).body.collection.assets);
  getCollectionAssets = async (props: GetCollectionAssetsProps, headers?: HeadersInit) => ((await this.raw.getCollectionAssets(props, headers)).body.collection.assets);
  getCollectionAssetIds = async (props: GetCollectionAssetsProps, headers?: HeadersInit) => ((await this.raw.getCollectionAssetIds(props, headers)).body.collection.assets);
  createCollection = async (props: CreateCollectionProps, headers?: HeadersInit) => ((await this.raw.createCollection(props, headers)).body.collectionId);
  updateCollectionImage = async (props: UpdateCollectionImageProps, headers?: HeadersInit) => ((await this.raw.updateCollectionImage(props, headers)).success);
  updateCollection = async (props: UpdateCollectionProps, headers?: HeadersInit) => ((await this.raw.updateCollection(props, headers)).success);
  activateCollection = async (props: ActivateCollectionProps, headers?: HeadersInit) => ((await this.raw.activateCollection(props, headers)).success);
  deactivateCollection = async (props: ActivateCollectionProps, headers?: HeadersInit) => ((await this.raw.deactivateCollection(props, headers)).success);

  raw: RawCollectionsHandlers = {
    info: async (props, headers) => this.request('/collection/info' + propsToQueryString(props), { headers }),
    getCollection: async (props, headers) => this.request('/collection/info' + propsToQueryString(props), { headers }),
    getCollections: async (props, headers) => this.request('/collection/info' + propsToQueryString(props), { headers }),
    assets: async (props, headers) => this.request('/collection/assets' + propsToQueryString(props), { headers }),
    getCollectionAssets: async (props, headers) => this.request('/collection/assets' + propsToQueryString(props), { headers }),
    getCollectionAssetIds: async (props, headers) => this.request('/collection/assets' + propsToQueryString({ ...props, idOnly: true }), { headers }),
    createCollection: async (props, headers) => this.request('/collection/new', { method: 'POST', body: JSON.stringify(props), headers }),
    updateCollectionImage: async (props, headers) => this.request('/collection/image', { method: 'POST', body: JSON.stringify(props), headers }),
    updateCollection: async (props, headers) => this.request('/collection/update', { method: 'PUT', body: JSON.stringify(props), headers }),
    activateCollection: async (props, headers) => this.request('/collection/activate', { method: 'PUT', body: JSON.stringify(props), headers }),
    deactivateCollection: async (props, headers) => this.request('/collection/deactivate', { method: 'PUT', body: JSON.stringify(props), headers }),
  };

  safe: SafeCollectionsHandlers = {
    info: async (props, headers) => {
      try { return { result: await this.info(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollection: async (props, headers) => {
      try { return { result: await this.getCollection(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollections: async (props, headers) => {
      try { return { result: await this.getCollections(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    assets: async (props, headers) => {
      try { return { result: await this.assets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionAssets: async (props, headers) => {
      try { return { result: await this.getCollectionAssets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionAssetIds: async (props, headers) => {
      try { return { result: await this.getCollectionAssetIds(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    createCollection: async (props, headers) => {
      try { return { result: await this.createCollection(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateCollectionImage: async (props, headers) => {
      try { return { result: await this.updateCollectionImage(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateCollection: async (props, headers) => {
      try { return { result: await this.updateCollection(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    activateCollection: async (props, headers) => {
      try { return { result: await this.activateCollection(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    deactivateCollection: async (props, headers) => {
      try { return { result: await this.deactivateCollection(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}