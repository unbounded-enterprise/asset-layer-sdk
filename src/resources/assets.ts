import type { BasicConditionalBoolResult } from '../types/basic-types';
import type { UpdateAssetProps, GetUserCollectionAssetsProps, GetUserCollectionsAssetsProps, GetUserSlotAssetsProps, GetUserSlotsAssetsProps, GetAssetProps, GetAssetsProps, MintAssetsProps, SendAssetProps, SendAssetsProps, SendCollectionAssetsProps, SendLowestAssetProps, SendRandomAssetProps, UpdateAssetsProps, UpdateCollectionAssetsProps, SafeAssetsHandlers, RawAssetsHandlers, AssetSendProps, AssetUpdateProps, UpdateAssetResponse, UpdateAssetsResponse, UpdateCollectionAssetsResponse, AssetInfoProps, AssetUserProps, GetUserAssetsBaseProps, GetAssetHistoryProps, GetAssetOwnershipHistoryProps, MintAssetsWithIdsResponse } from '../types/asset';
import type { UpdateAssetExpressionValueProps, UpdateAssetExpressionValueResponse, UpdateAssetsExpressionValueProps, UpdateAssetsExpressionValueResponse, UpdateBulkExpressionValuesProps, UpdateCollectionAssetsExpressionValueProps, UpdateExpressionValuesProps } from '../types/expression';
import { AssetLayerRequestOptions, Base } from './base';
import { propsToQueryString } from '../utils/basic-format';
import { parseBasicError } from '../utils/basic-error';

export class Assets extends Base {
  info = async (props: AssetInfoProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => {
    const response = await this.raw.info(props, headers, options);
    return (props.assetIds) ? response.body.assets : response.body.assets[0];
  };
  getAsset = async (props: GetAssetProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getAsset(props, headers, options)).body.assets[0]);
  getAssets = async (props: GetAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getAssets(props, headers, options)).body.assets);
  user = async (props?: AssetUserProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.user(props, headers, options)).body.assets);
  getUserAssets = async (props?: GetUserAssetsBaseProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getUserAssets(props, headers, options)).body.assets);
  getUserAssetIds = async (props?: GetUserAssetsBaseProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getUserAssetIds(props, headers, options)).body.assets);
  getUserAssetsCounts = async (props?: GetUserAssetsBaseProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getUserAssetsCounts(props, headers, options)).body.assets);
  getUserCollectionAssets = async (props: GetUserCollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getUserCollectionAssets(props, headers, options)).body.assets);
  getUserCollectionsAssets = async (props: GetUserCollectionsAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getUserCollectionsAssets(props, headers, options)).body.collections);
  getUserSlotAssets = async (props: GetUserSlotAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getUserSlotAssets(props, headers, options)).body.assets);
  getUserSlotsAssets = async (props: GetUserSlotsAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getUserSlotsAssets(props, headers, options)).body.assets);
  getAssetHistory = async (props: GetAssetHistoryProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getAssetHistory(props, headers, options)).body.history);
  getAssetMarketHistory = async (props: GetAssetHistoryProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getAssetMarketHistory(props, headers, options)).body.history);
  getAssetOwnershipHistory = async (props: GetAssetOwnershipHistoryProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getAssetOwnershipHistory(props, headers, options)).body.history);
  async mint<T extends MintAssetsProps> (props: T, headers?: HeadersInit, options?: AssetLayerRequestOptions): Promise<BasicConditionalBoolResult<T, 'includeAssetIds', string[], boolean>>;
  async mint<T extends MintAssetsProps> (props: T, headers?: HeadersInit, options?: AssetLayerRequestOptions) {
    const response = await this.raw.mint(props, headers, options);
    return (props.includeAssetIds) ? (response as MintAssetsWithIdsResponse).body.assetIds : response.success;
  };
  send = async (props: AssetSendProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.send(props, headers, options)).body);
  sendAsset = async (props: SendAssetProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.sendAsset(props, headers, options)).body);
  sendAssets = async (props: SendAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.sendAssets(props, headers, options)).body);
  sendCollectionAssets = async (props: SendCollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.sendCollectionAssets(props, headers, options)).body);
  sendLowestAsset = async (props: SendLowestAssetProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.sendLowestAsset(props, headers, options)).body);
  sendRandomAsset = async (props: SendRandomAssetProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.sendRandomAsset(props, headers, options)).body);
  update = async (props: AssetUpdateProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => {
    const response = await this.raw.update(props, headers, options);
    return (props.collectionId) ? (response as UpdateCollectionAssetsResponse).body.collectionId
      : (props.assetIds) ? (response as UpdateAssetsResponse).body.assetIds
      : (response as UpdateAssetResponse).body.assetId;
  };
  updateAsset = async (props: UpdateAssetProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.updateAsset(props, headers, options)).body.assetId);
  updateAssets = async (props: UpdateAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.updateAssets(props, headers, options)).body.assetIds);
  updateCollectionAssets = async (props: UpdateCollectionAssetsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.updateCollectionAssets(props, headers, options)).body.collectionId);
  
  expressionValues = async (props: UpdateExpressionValuesProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { 
    const response = await this.raw.expressionValues(props, headers, options);
    return (props.collectionId) ? response.success 
      : (props.assetIds) ? (response as UpdateAssetsExpressionValueResponse).body.assetIds 
      : (response as UpdateAssetExpressionValueResponse).body.expressionValueId; 
  }
  updateAssetExpressionValue = async (props: UpdateAssetExpressionValueProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.updateAssetExpressionValue(props, headers, options)).body.expressionValueId; }
  updateAssetsExpressionValue = async (props: UpdateAssetsExpressionValueProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.updateAssetsExpressionValue(props, headers, options)).body.assetIds; }
  updateCollectionAssetsExpressionValue = async (props: UpdateCollectionAssetsExpressionValueProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.updateCollectionAssetsExpressionValue(props, headers, options)).success; }
  updateBulkExpressionValues = async (props: UpdateBulkExpressionValuesProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.updateBulkExpressionValues(props, headers, options)).body.log; }

  raw: RawAssetsHandlers = {
    info: async (props, headers, options) => this.request('/asset/info' + propsToQueryString(props), { headers }, options),
    getAsset: async (props, headers, options) => this.request('/asset/info' + propsToQueryString(props), { headers }, options),
    getAssets: async (props, headers, options) => this.request('/asset/info' + propsToQueryString(props), { headers }, options),
    user: async (props, headers, options) => this.request('/asset/user' + propsToQueryString(props), { headers }, options),
    getUserAssets: async (props, headers, options) => this.request('/asset/user' + propsToQueryString(props), { headers }, options),
    getUserAssetIds: async (props, headers, options) => this.request('/asset/user' + propsToQueryString({ ...props, idOnly: true }), { headers }, options),
    getUserAssetsCounts: async (props, headers, options) => this.request('/asset/user' + propsToQueryString({ ...props, countsOnly: true }), { headers }, options),
    getUserCollectionAssets: async (props, headers, options) => this.request('/asset/collection' + propsToQueryString(props), { headers }, options),
    getUserCollectionsAssets: async (props, headers, options) => this.request('/asset/collections' + propsToQueryString(props), { headers }, options),
    getUserSlotAssets: async (props, headers, options) => this.request('/asset/slot' + propsToQueryString(props), { headers }, options),
    getUserSlotsAssets: async (props, headers, options) => this.request('/asset/slots' + propsToQueryString(props), { headers }, options),
    getAssetHistory: async (props, headers, options) => this.request('/asset/history' + propsToQueryString(props), { headers }, options),
    getAssetMarketHistory: async (props, headers, options) => this.request('/asset/marketHistory' + propsToQueryString(props), { headers }, options),
    getAssetOwnershipHistory: async (props, headers, options) => this.request('/asset/ownershipHistory' + propsToQueryString(props), { headers }, options),
    mint: async (props, headers, options) => this.request('/asset/mint', { method: 'POST', body: JSON.stringify(props), headers }, options),
    send: async (props, headers, options) => this.request('/asset/send', { method: 'POST', body: JSON.stringify(props), headers }, options),
    sendAsset: async (props, headers, options) => this.request('/asset/send', { method: 'POST', body: JSON.stringify(props), headers }, options),
    sendAssets: async (props, headers, options) => this.request('/asset/send', { method: 'POST', body: JSON.stringify(props), headers }, options),
    sendCollectionAssets: async (props, headers, options) => this.request('/asset/send', { method: 'POST', body: JSON.stringify(props), headers }, options),
    sendLowestAsset: async (props, headers, options) => this.request('/asset/sendLowest', { method: 'POST', body: JSON.stringify(props), headers }, options),
    sendRandomAsset: async (props, headers, options) => this.request('/asset/sendRandom', { method: 'POST', body: JSON.stringify(props), headers }, options),
    update: async (props, headers, options) => this.request('/asset/update', { method: 'PUT', body: JSON.stringify(props), headers }, options),
    updateAsset: async (props, headers, options) => this.request('/asset/update', { method: 'PUT', body: JSON.stringify(props), headers }, options),
    updateAssets: async (props, headers, options) => this.request('/asset/update', { method: 'PUT', body: JSON.stringify(props), headers }, options),
    updateCollectionAssets: async (props, headers, options) => this.request('/asset/update', { method: 'PUT', body: JSON.stringify(props), headers }, options),

    expressionValues: async (props, headers, options) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }, options),
    updateAssetExpressionValue: (props, headers, options) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }, options),
    updateAssetsExpressionValue: (props, headers, options) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }, options),
    updateCollectionAssetsExpressionValue: (props, headers, options) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }, options),
    updateBulkExpressionValues: (props, headers, options) => this.request('/asset/expressionValuesBulk', { method: 'POST', body: JSON.stringify(props), headers }, options),
  };

  safe: SafeAssetsHandlers = {
    info: async (props, headers, options) => {
      try { return { result: await this.info(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAsset: async (props, headers, options) => {
      try { return { result: await this.getAsset(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAssets: async (props, headers, options) => {
      try { return { result: await this.getAssets(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    user: async (props, headers, options) => {
      try { return { result: await this.user(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserAssets: async (props, headers, options) => {
      try { return { result: await this.getUserAssets(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserAssetIds: async (props, headers, options) => {
      try { return { result: await this.getUserAssetIds(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserAssetsCounts: async (props, headers, options) => {
      try { return { result: await this.getUserAssetsCounts(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserCollectionAssets: async (props, headers, options) => {
      try { return { result: await this.getUserCollectionAssets(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserCollectionsAssets: async (props, headers, options) => {
      try { return { result: await this.getUserCollectionsAssets(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserSlotAssets: async (props, headers, options) => {
      try { return { result: await this.getUserSlotAssets(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserSlotsAssets: async (props, headers, options) => {
      try { return { result: await this.getUserSlotsAssets(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAssetHistory: async (props, headers, options) => {
      try { return { result: await this.getAssetHistory(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAssetMarketHistory: async (props, headers, options) => {
      try { return { result: await this.getAssetMarketHistory(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAssetOwnershipHistory: async (props, headers, options) => {
      try { return { result: await this.getAssetOwnershipHistory(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    mint: async (props, headers, options) => {
      try { return { result: await this.mint(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    send: async (props, headers, options) => {
      try { return { result: await this.send(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendAsset: async (props, headers, options) => {
      try { return { result: await this.sendAsset(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendAssets: async (props, headers, options) => {
      try { return { result: await this.sendAssets(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendCollectionAssets: async (props, headers, options) => {
      try { return { result: await this.sendCollectionAssets(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendLowestAsset: async (props, headers, options) => {
      try { return { result: await this.sendLowestAsset(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendRandomAsset: async (props, headers, options) => {
      try { return { result: await this.sendRandomAsset(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    update: async (props, headers, options) => {
      try { return { result: await this.update(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAsset: async (props, headers, options) => {
      try { return { result: await this.updateAsset(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssets: async (props, headers, options) => {
      try { return { result: await this.updateAssets(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateCollectionAssets: async (props, headers, options) => {
      try { return { result: await this.updateCollectionAssets(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },

    expressionValues: async (props, headers, options) => {
      try { return { result: await this.expressionValues(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssetExpressionValue: async (props, headers, options) => {
      try { return { result: await this.updateAssetExpressionValue(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssetsExpressionValue: async (props, headers, options) => {
      try { return { result: await this.updateAssetsExpressionValue(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateCollectionAssetsExpressionValue: async (props, headers, options) => {
      try { return { result: await this.updateCollectionAssetsExpressionValue(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateBulkExpressionValues: async (props, headers, options) => {
      try { return { result: await this.updateBulkExpressionValues(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}