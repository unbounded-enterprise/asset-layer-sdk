import type { ActivateCollectionProps, CreateCollectionProps, CollectionAssetsProps, GetCollectionAssetsProps, GetCollectionProps, CollectionInfoProps, GetCollectionsProps, RawCollectionsHandlers, SafeCollectionsHandlers, UpdateCollectionImageProps, UpdateCollectionProps, UpdateDefaultPropertiesProps } from '../types/collection';
import { AssetLayerRequestOptions, Base } from './base';
import { propsToQueryString } from '../utils/basic-format';
import { parseBasicError } from '../utils/basic-error';

export class Collections extends Base {
  info = async (props: CollectionInfoProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => {
    const response = await this.raw.info(props, headers, options);
    return (props.collectionIds) ? response.body.collections : response.body.collections[0];
  };
  getCollection = async (props: GetCollectionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getCollection(props, headers, options)).body.collections[0]);
  getCollections = async (props: GetCollectionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getCollections(props, headers, options)).body.collections);
  assets = async (props: CollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getCollectionAssets(props, headers, options)).body.collection.assets);
  getCollectionAssets = async (props: GetCollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getCollectionAssets(props, headers, options)).body.collection.assets);
  getCollectionAssetIds = async (props: GetCollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getCollectionAssetIds(props, headers, options)).body.collection.assets);
  createCollection = async (props: CreateCollectionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.createCollection(props, headers, options)).body.collectionId);
  updateCollection = async (props: UpdateCollectionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.updateCollection(props, headers, options)).success);
  updateCollectionImage = async (props: UpdateCollectionImageProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.updateCollectionImage(props, headers, options)).success);
  updateDefaultProperties = async (props: UpdateDefaultPropertiesProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.updateDefaultProperties(props, headers, options)).success);
  activateCollection = async (props: ActivateCollectionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.activateCollection(props, headers, options)).success);
  deactivateCollection = async (props: ActivateCollectionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.deactivateCollection(props, headers, options)).success);

  raw: RawCollectionsHandlers = {
    info: async (props, headers, options) => this.request('/collection/info' + propsToQueryString(props), { headers }, options),
    getCollection: async (props, headers, options) => this.request('/collection/info' + propsToQueryString(props), { headers }, options),
    getCollections: async (props, headers, options) => this.request('/collection/info' + propsToQueryString(props), { headers }, options),
    assets: async (props, headers, options) => this.request('/collection/assets' + propsToQueryString(props), { headers }, options),
    getCollectionAssets: async (props, headers, options) => this.request('/collection/assets' + propsToQueryString(props), { headers }, options),
    getCollectionAssetIds: async (props, headers, options) => this.request('/collection/assets' + propsToQueryString({ ...props, idOnly: true }), { headers }, options),
    createCollection: async (props, headers, options) => this.request('/collection/new', { method: 'POST', body: JSON.stringify(props), headers }, options),
    updateCollection: async (props, headers, options) => this.request('/collection/update', { method: 'PUT', body: JSON.stringify(props), headers }, options),
    updateCollectionImage: async (props, headers, options) => this.request('/collection/image', { method: 'POST', body: JSON.stringify(props), headers }, options),
    updateDefaultProperties: async (props, headers, options) => this.request('/collection/defaultProperties', { method: 'PUT', body: JSON.stringify(props), headers }, options),
    activateCollection: async (props, headers, options) => this.request('/collection/activate', { method: 'PUT', body: JSON.stringify(props), headers }, options),
    deactivateCollection: async (props, headers, options) => this.request('/collection/deactivate', { method: 'PUT', body: JSON.stringify(props), headers }, options),
  };

  safe: SafeCollectionsHandlers = {
    info: async (props, headers, options) => {
      try { return { result: await this.info(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollection: async (props, headers, options) => {
      try { return { result: await this.getCollection(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollections: async (props, headers, options) => {
      try { return { result: await this.getCollections(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    assets: async (props, headers, options) => {
      try { return { result: await this.assets(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionAssets: async (props, headers, options) => {
      try { return { result: await this.getCollectionAssets(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getCollectionAssetIds: async (props, headers, options) => {
      try { return { result: await this.getCollectionAssetIds(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    createCollection: async (props, headers, options) => {
      try { return { result: await this.createCollection(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateCollection: async (props, headers, options) => {
      try { return { result: await this.updateCollection(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateCollectionImage: async (props, headers, options) => {
      try { return { result: await this.updateCollectionImage(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateDefaultProperties: async (props, headers, options) => {
      try { return { result: await this.updateDefaultProperties(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    activateCollection: async (props, headers, options) => {
      try { return { result: await this.activateCollection(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    deactivateCollection: async (props, headers, options) => {
      try { return { result: await this.deactivateCollection(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}