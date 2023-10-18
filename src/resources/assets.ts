import type { BasicConditionalBoolResult } from '../types/basic-types';
import type { UpdateAssetProps, GetUserCollectionAssetsProps, GetUserCollectionsAssetsProps, GetUserSlotAssetsProps, GetUserSlotsAssetsProps, GetAssetProps, GetAssetsProps, MintAssetsProps, SendAssetProps, SendAssetsProps, SendCollectionAssetsProps, SendLowestAssetProps, SendRandomAssetProps, UpdateAssetsProps, UpdateCollectionAssetsProps, SafeAssetsHandlers, RawAssetsHandlers, AssetSendProps, AssetUpdateProps, UpdateAssetResponse, UpdateAssetsResponse, UpdateCollectionAssetsResponse, AssetInfoProps, AssetUserProps, GetUserAssetsBaseProps, GetAssetHistoryProps, GetAssetOwnershipHistoryProps, MintAssetsWithIdsResponse } from '../types/asset';
import type { UpdateAssetExpressionValueProps, UpdateAssetExpressionValueResponse, UpdateAssetsExpressionValueProps, UpdateAssetsExpressionValueResponse, UpdateBulkExpressionValuesProps, UpdateCollectionAssetsExpressionValueProps, UpdateExpressionValuesProps } from '../types/expression';
import { Base } from './base';
import { propsToQueryString } from '../utils/basic-format';
import { parseBasicError } from '../utils/basic-error';

export class Assets extends Base {
  info = async (props: AssetInfoProps, headers?: HeadersInit) => {
    const response = await this.raw.info(props, headers);
    return (props.assetIds) ? response.body.assets : response.body.assets[0];
  };
  getAsset = async (props: GetAssetProps, headers?: HeadersInit) => ((await this.raw.getAsset(props, headers)).body.assets[0]);
  getAssets = async (props: GetAssetsProps, headers?: HeadersInit) => ((await this.raw.getAssets(props, headers)).body.assets);
  user = async (props?: AssetUserProps, headers?: HeadersInit) => ((await this.raw.user(props, headers)).body.assets);
  getUserAssets = async (props?: GetUserAssetsBaseProps, headers?: HeadersInit) => ((await this.raw.getUserAssets(props, headers)).body.assets);
  getUserAssetIds = async (props?: GetUserAssetsBaseProps, headers?: HeadersInit) => ((await this.raw.getUserAssetIds(props, headers)).body.assets);
  getUserAssetsCounts = async (props?: GetUserAssetsBaseProps, headers?: HeadersInit) => ((await this.raw.getUserAssetsCounts(props, headers)).body.assets);
  getUserCollectionAssets = async (props: GetUserCollectionAssetsProps, headers?: HeadersInit) => ((await this.raw.getUserCollectionAssets(props, headers)).body.assets);
  getUserCollectionsAssets = async (props: GetUserCollectionsAssetsProps, headers?: HeadersInit) => ((await this.raw.getUserCollectionsAssets(props, headers)).body.collections);
  getUserSlotAssets = async (props: GetUserSlotAssetsProps, headers?: HeadersInit) => ((await this.raw.getUserSlotAssets(props, headers)).body.assets);
  getUserSlotsAssets = async (props: GetUserSlotsAssetsProps, headers?: HeadersInit) => ((await this.raw.getUserSlotsAssets(props, headers)).body.assets);
  getAssetHistory = async (props: GetAssetHistoryProps, headers?: HeadersInit) => ((await this.raw.getAssetHistory(props, headers)).body.history);
  getAssetMarketHistory = async (props: GetAssetHistoryProps, headers?: HeadersInit) => ((await this.raw.getAssetMarketHistory(props, headers)).body.history);
  getAssetOwnershipHistory = async (props: GetAssetOwnershipHistoryProps, headers?: HeadersInit) => ((await this.raw.getAssetOwnershipHistory(props, headers)).body.history);
  async mint<T extends MintAssetsProps> (props: T, headers?: HeadersInit): Promise<BasicConditionalBoolResult<T, 'includeAssetIds', string[], boolean>>;
  async mint<T extends MintAssetsProps> (props: T, headers?: HeadersInit) {
    const response = await this.raw.mint(props, headers);
    return (props.includeAssetIds) ? (response as MintAssetsWithIdsResponse).body.assetIds : response.success;
  };
  send = async (props: AssetSendProps, headers?: HeadersInit) => ((await this.raw.send(props, headers)).body);
  sendAsset = async (props: SendAssetProps, headers?: HeadersInit) => ((await this.raw.sendAsset(props, headers)).body);
  sendAssets = async (props: SendAssetsProps, headers?: HeadersInit) => ((await this.raw.sendAssets(props, headers)).body);
  sendCollectionAssets = async (props: SendCollectionAssetsProps, headers?: HeadersInit) => ((await this.raw.sendCollectionAssets(props, headers)).body);
  sendLowestAsset = async (props: SendLowestAssetProps, headers?: HeadersInit) => ((await this.raw.sendLowestAsset(props, headers)).body);
  sendRandomAsset = async (props: SendRandomAssetProps, headers?: HeadersInit) => ((await this.raw.sendRandomAsset(props, headers)).body);
  update = async (props: AssetUpdateProps, headers?: HeadersInit) => {
    const response = await this.raw.update(props, headers);
    return (props.collectionId) ? (response as UpdateCollectionAssetsResponse).body.collectionId
      : (props.assetIds) ? (response as UpdateAssetsResponse).body.assetIds
      : (response as UpdateAssetResponse).body.assetId;
  };
  updateAsset = async (props: UpdateAssetProps, headers?: HeadersInit) => ((await this.raw.updateAsset(props, headers)).body.assetId);
  updateAssets = async (props: UpdateAssetsProps, headers?: HeadersInit) => ((await this.raw.updateAssets(props, headers)).body.assetIds);
  updateCollectionAssets = async (props: UpdateCollectionAssetsProps, headers?: HeadersInit) => ((await this.raw.updateCollectionAssets(props, headers)).body.collectionId);
  
  expressionValues = async (props: UpdateExpressionValuesProps, headers?: HeadersInit) => { 
    const response = await this.raw.expressionValues(props, headers);
    return (props.collectionId) ? response.success 
      : (props.assetIds) ? (response as UpdateAssetsExpressionValueResponse).body.assetIds 
      : (response as UpdateAssetExpressionValueResponse).body.expressionValueId; 
  }
  updateAssetExpressionValue = async (props: UpdateAssetExpressionValueProps, headers?: HeadersInit) => { return (await this.raw.updateAssetExpressionValue(props, headers)).body.expressionValueId; }
  updateAssetsExpressionValue = async (props: UpdateAssetsExpressionValueProps, headers?: HeadersInit) => { return (await this.raw.updateAssetsExpressionValue(props, headers)).body.assetIds; }
  updateCollectionAssetsExpressionValue = async (props: UpdateCollectionAssetsExpressionValueProps, headers?: HeadersInit) => { return (await this.raw.updateCollectionAssetsExpressionValue(props, headers)).success; }
  updateBulkExpressionValues = async (props: UpdateBulkExpressionValuesProps, headers?: HeadersInit) => { return (await this.raw.updateBulkExpressionValues(props, headers)).body.log; }

  raw: RawAssetsHandlers = {
    info: async (props, headers) => this.request('/asset/info' + propsToQueryString(props), { headers }),
    getAsset: async (props, headers) => this.request('/asset/info' + propsToQueryString(props), { headers }),
    getAssets: async (props, headers) => this.request('/asset/info' + propsToQueryString(props), { headers }),
    user: async (props, headers) => this.request('/asset/user' + propsToQueryString(props), { headers }),
    getUserAssets: async (props, headers) => this.request('/asset/user' + propsToQueryString(props), { headers }),
    getUserAssetIds: async (props, headers) => this.request('/asset/user' + propsToQueryString({ ...props, idOnly: true }), { headers }),
    getUserAssetsCounts: async (props, headers) => this.request('/asset/user' + propsToQueryString({ ...props, countsOnly: true }), { headers }),
    getUserCollectionAssets: async (props, headers) => this.request('/asset/collection' + propsToQueryString(props), { headers }),
    getUserCollectionsAssets: async (props, headers) => this.request('/asset/collections' + propsToQueryString(props), { headers }),
    getUserSlotAssets: async (props, headers) => this.request('/asset/slot' + propsToQueryString(props), { headers }),
    getUserSlotsAssets: async (props, headers) => this.request('/asset/slots' + propsToQueryString(props), { headers }),
    getAssetHistory: async (props, headers) => this.request('/asset/history' + propsToQueryString(props), { headers }),
    getAssetMarketHistory: async (props, headers) => this.request('/asset/marketHistory' + propsToQueryString(props), { headers }),
    getAssetOwnershipHistory: async (props, headers) => this.request('/asset/ownershipHistory' + propsToQueryString(props), { headers }),
    mint: async (props, headers) => this.request('/asset/mint', { method: 'POST', body: JSON.stringify(props), headers }),
    send: async (props, headers) => this.request('/asset/send', { method: 'POST', body: JSON.stringify(props), headers }),
    sendAsset: async (props, headers) => this.request('/asset/send', { method: 'POST', body: JSON.stringify(props), headers }),
    sendAssets: async (props, headers) => this.request('/asset/send', { method: 'POST', body: JSON.stringify(props), headers }),
    sendCollectionAssets: async (props, headers) => this.request('/asset/send', { method: 'POST', body: JSON.stringify(props), headers }),
    sendLowestAsset: async (props, headers) => this.request('/asset/sendLowest', { method: 'POST', body: JSON.stringify(props), headers }),
    sendRandomAsset: async (props, headers) => this.request('/asset/sendRandom', { method: 'POST', body: JSON.stringify(props), headers }),
    update: async (props, headers) => this.request('/asset/update', { method: 'PUT', body: JSON.stringify(props), headers }),
    updateAsset: async (props, headers) => this.request('/asset/update', { method: 'PUT', body: JSON.stringify(props), headers }),
    updateAssets: async (props, headers) => this.request('/asset/update', { method: 'PUT', body: JSON.stringify(props), headers }),
    updateCollectionAssets: async (props, headers) => this.request('/asset/update', { method: 'PUT', body: JSON.stringify(props), headers }),

    expressionValues: async (props, headers) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }),
    updateAssetExpressionValue: (props, headers) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }),
    updateAssetsExpressionValue: (props, headers) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }),
    updateCollectionAssetsExpressionValue: (props, headers) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }),
    updateBulkExpressionValues: (props, headers) => this.request('/asset/expressionValuesBulk', { method: 'POST', body: JSON.stringify(props), headers }),
  };

  safe: SafeAssetsHandlers = {
    info: async (props, headers) => {
      try { return { result: await this.info(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAsset: async (props, headers) => {
      try { return { result: await this.getAsset(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAssets: async (props, headers) => {
      try { return { result: await this.getAssets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    user: async (props, headers) => {
      try { return { result: await this.user(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserAssets: async (props, headers) => {
      try { return { result: await this.getUserAssets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserAssetIds: async (props, headers) => {
      try { return { result: await this.getUserAssetIds(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserAssetsCounts: async (props, headers) => {
      try { return { result: await this.getUserAssetsCounts(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserCollectionAssets: async (props, headers) => {
      try { return { result: await this.getUserCollectionAssets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserCollectionsAssets: async (props, headers) => {
      try { return { result: await this.getUserCollectionsAssets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserSlotAssets: async (props, headers) => {
      try { return { result: await this.getUserSlotAssets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserSlotsAssets: async (props, headers) => {
      try { return { result: await this.getUserSlotsAssets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAssetHistory: async (props, headers) => {
      try { return { result: await this.getAssetHistory(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAssetMarketHistory: async (props, headers) => {
      try { return { result: await this.getAssetMarketHistory(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAssetOwnershipHistory: async (props, headers) => {
      try { return { result: await this.getAssetOwnershipHistory(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    mint: async (props, headers) => {
      try { return { result: await this.mint(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    send: async (props, headers) => {
      try { return { result: await this.send(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendAsset: async (props, headers) => {
      try { return { result: await this.sendAsset(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendAssets: async (props, headers) => {
      try { return { result: await this.sendAssets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendCollectionAssets: async (props, headers) => {
      try { return { result: await this.sendCollectionAssets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendLowestAsset: async (props, headers) => {
      try { return { result: await this.sendLowestAsset(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendRandomAsset: async (props, headers) => {
      try { return { result: await this.sendRandomAsset(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    update: async (props, headers) => {
      try { return { result: await this.update(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAsset: async (props, headers) => {
      try { return { result: await this.updateAsset(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssets: async (props, headers) => {
      try { return { result: await this.updateAssets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateCollectionAssets: async (props, headers) => {
      try { return { result: await this.updateCollectionAssets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },

    expressionValues: async (props, headers) => {
      try { return { result: await this.expressionValues(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssetExpressionValue: async (props, headers) => {
      try { return { result: await this.updateAssetExpressionValue(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssetsExpressionValue: async (props, headers) => {
      try { return { result: await this.updateAssetsExpressionValue(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateCollectionAssetsExpressionValue: async (props, headers) => {
      try { return { result: await this.updateCollectionAssetsExpressionValue(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateBulkExpressionValues: async (props, headers) => {
      try { return { result: await this.updateBulkExpressionValues(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}