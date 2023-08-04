import { Base } from './base';
import { Asset, UpdateAssetProps, GetUserCollectionAssetsProps, GetUserCollectionsAssetsProps, GetUserSlotAssetsProps, GetUserSlotsAssetsProps, GetAssetProps, GetAssetsProps, GetUserAssetsProps, MintAssetsProps, SendAssetProps, SendAssetsProps, SendCollectionAssetsProps, SendLowestAssetProps, SendRandomAssetProps, UpdateAssetsProps, UpdateCollectionAssetsProps, SafeAssetsHandlers, RawAssetsHandlers, SendAssetAllProps } from '../types/asset';
import { propsToQueryString } from 'src/utils/basic-format';
import { parseBasicError } from 'src/utils/basic-error';
import { UpdateAssetExpressionValueProps, UpdateAssetExpressionValueResponse, UpdateAssetsExpressionValueProps, UpdateAssetsExpressionValueResponse, UpdateBulkExpressionValuesProps, UpdateCollectionAssetsExpressionValueProps, UpdateExpressionValuesProps } from 'src/types/expression';

export class Assets extends Base {
  getAsset = async (props: GetAssetProps, headers?: HeadersInit) => ((await this.raw.getAsset(props, headers)).body.assets[0]);
  getAssets = async (props: GetAssetsProps, headers?: HeadersInit) => ((await this.raw.getAssets(props, headers)).body.assets);
  getUserAssets = async (props: GetUserAssetsProps, headers?: HeadersInit) => ((await this.raw.getUserAssets(props, headers)).body.assets);
  getUserCollectionAssets = async (props: GetUserCollectionAssetsProps, headers?: HeadersInit) => ((await this.raw.getUserCollectionAssets(props, headers)).body.assets);
  getUserCollectionsAssets = async (props: GetUserCollectionsAssetsProps, headers?: HeadersInit) => ((await this.raw.getUserCollectionsAssets(props, headers)).body.assets);
  getUserSlotAssets = async (props: GetUserSlotAssetsProps, headers?: HeadersInit) => ((await this.raw.getUserSlotAssets(props, headers)).body.assets);
  getUserSlotsAssets = async (props: GetUserSlotsAssetsProps, headers?: HeadersInit) => ((await this.raw.getUserSlotsAssets(props, headers)).body.assets);
  mintAssets = async (props: MintAssetsProps, headers?: HeadersInit) => ((await this.raw.mintAssets(props, headers)).success);
  send = async (props: SendAssetAllProps, headers?: HeadersInit) => ((await this.raw.send(props, headers)).body);
  sendAsset = async (props: SendAssetProps, headers?: HeadersInit) => ((await this.raw.sendAsset(props, headers)).body);
  sendAssets = async (props: SendAssetsProps, headers?: HeadersInit) => ((await this.raw.sendAssets(props, headers)).body);
  sendCollectionAssets = async (props: SendCollectionAssetsProps, headers?: HeadersInit) => ((await this.raw.sendCollectionAssets(props, headers)).body);
  sendLowestAsset = async (props: SendLowestAssetProps, headers?: HeadersInit) => ((await this.raw.sendLowestAsset(props, headers)).body);
  sendRandomAsset = async (props: SendRandomAssetProps, headers?: HeadersInit) => ((await this.raw.sendRandomAsset(props, headers)).body);
  updateAsset = async (props: UpdateAssetProps, headers?: HeadersInit) => ((await this.raw.updateAsset(props, headers)).body.assetId);
  updateAssets = async (props: UpdateAssetsProps, headers?: HeadersInit) => ((await this.raw.updateAssets(props, headers)).body.assetIds);
  updateCollectionAssets = async (props: UpdateCollectionAssetsProps, headers?: HeadersInit) => ((await this.raw.updateCollectionAssets(props, headers)).body.collectionId);
  updateExpressionValues = async (props: UpdateExpressionValuesProps, headers?: HeadersInit) => { 
    const response = await this.raw.updateExpressionValues(props, headers);
    return (props.collectionId) ? response.success 
      : (props.assetIds) ? (response as UpdateAssetsExpressionValueResponse).body.assetIds 
      : (response as UpdateAssetExpressionValueResponse).body.expressionValueId; 
  }
  updateAssetExpressionValue = async (props: UpdateAssetExpressionValueProps, headers?: HeadersInit) => { return (await this.raw.updateAssetExpressionValue(props, headers)).body.expressionValueId; }
  updateAssetsExpressionValue = async (props: UpdateAssetsExpressionValueProps, headers?: HeadersInit) => { return (await this.raw.updateAssetsExpressionValue(props, headers)).body.assetIds; }
  updateCollectionAssetsExpressionValue = async (props: UpdateCollectionAssetsExpressionValueProps, headers?: HeadersInit) => { return (await this.raw.updateCollectionAssetsExpressionValue(props, headers)).success; }
  updateBulkExpressionValues = async (props: UpdateBulkExpressionValuesProps, headers?: HeadersInit) => { return (await this.raw.updateBulkExpressionValues(props, headers)).body.log; }

  raw: RawAssetsHandlers = {
    getAsset: async (props, headers) => this.request('/asset/info' + propsToQueryString(props), { headers }),
    getAssets: async (props, headers) => this.request('/asset/info' + propsToQueryString(props), { headers }),
    getUserAssets: async (props, headers) => this.request('/asset/user' + propsToQueryString(props), { headers }),
    getUserCollectionAssets: async (props, headers) => this.request('/asset/collection' + propsToQueryString(props), { headers }),
    getUserCollectionsAssets: async (props, headers) => this.request('/asset/collections' + propsToQueryString(props), { headers }),
    getUserSlotAssets: async (props, headers) => this.request('/asset/slot' + propsToQueryString(props), { headers }),
    getUserSlotsAssets: async (props, headers) => this.request('/asset/slots' + propsToQueryString(props), { headers }),
    mintAssets: async (props, headers) => this.request('/asset/mint', { method: 'POST', body: JSON.stringify(props), headers }),
    send: async (props, headers) => this.request('/asset/send', { method: 'POST', body: JSON.stringify(props), headers }),
    sendAsset: async (props, headers) => this.request('/asset/send', { method: 'POST', body: JSON.stringify(props), headers }),
    sendAssets: async (props, headers) => this.request('/asset/send', { method: 'POST', body: JSON.stringify(props), headers }),
    sendCollectionAssets: async (props, headers) => this.request('/asset/send', { method: 'POST', body: JSON.stringify(props), headers }),
    sendLowestAsset: async (props, headers) => this.request('/asset/sendLowest', { method: 'POST', body: JSON.stringify(props), headers }),
    sendRandomAsset: async (props, headers) => this.request('/asset/sendRandom', { method: 'POST', body: JSON.stringify(props), headers }),
    updateAsset: async (props, headers) => this.request('/asset/update', { method: 'PUT', body: JSON.stringify(props), headers }),
    updateAssets: async (props, headers) => this.request('/asset/update', { method: 'PUT', body: JSON.stringify(props), headers }),
    updateCollectionAssets: async (props, headers) => this.request('/asset/update', { method: 'PUT', body: JSON.stringify(props), headers }),
    updateExpressionValues: async (props, headers) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }),
    updateAssetExpressionValue: (props, headers) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }),
    updateAssetsExpressionValue: (props, headers) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }),
    updateCollectionAssetsExpressionValue: (props, headers) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }),
    updateBulkExpressionValues: (props, headers) => this.request('/asset/expressionValuesBulk', { method: 'POST', body: JSON.stringify(props), headers }),
  };

  safe: SafeAssetsHandlers = {
    getAsset: async (props, headers) => {
      try { return { result: await this.getAsset(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAssets: async (props, headers) => {
      try { return { result: await this.getAssets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserAssets: async (props, headers) => {
      try { return { result: await this.getUserAssets(props, headers) }; }
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
    mintAssets: async (props, headers) => {
      try { return { result: await this.mintAssets(props, headers) }; }
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
    updateAsset: async (props, headers) => {
      try { return { result: await this.updateAsset(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssets: async (props, headers) => {
      try { return { result: await this.updateAssets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateCollectionAssets: async (props, headers) => {
      try { return { result: await this.updateCollectionAssets(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateExpressionValues: async (props, headers) => {
      try { return { result: await this.updateExpressionValues(props, headers) }; }
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