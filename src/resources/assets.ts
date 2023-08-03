import { Base } from './base';
import { Asset, UpdateAssetProps, GetUserCollectionAssetsProps, GetUserCollectionsAssetsProps, GetUserSlotAssetsProps, GetUserSlotsAssetsProps, GetAssetProps, GetAssetsProps, GetUserAssetsProps, MintAssetsProps, SendAssetProps, SendAssetsProps, SendCollectionAssetsProps, SendLowestAssetProps, SendRandomAssetProps, UpdateAssetsProps, UpdateCollectionAssetsProps, SafeAssetsHandlers, RawAssetsHandlers } from '../types/asset';
import { propsToQueryString } from 'src/utils/basic-format';
import { parseBasicError } from 'src/utils/basic-error';
import { UpdateAssetExpressionValueProps, UpdateAssetsExpressionValueProps, UpdateBulkExpressionValuesProps, UpdateCollectionAssetsExpressionValueProps } from 'src/types/expression';

export class Assets extends Base {
  getAsset = async (props: GetAssetProps) => ((await this.raw.getAsset(props)).body.assets[0]);
  getAssets = async (props: GetAssetsProps) => ((await this.raw.getAssets(props)).body.assets);
  getUserAssets = async (props: GetUserAssetsProps) => ((await this.raw.getUserAssets(props)).body.assets);
  getUserCollectionAssets = async (props: GetUserCollectionAssetsProps) => ((await this.raw.getUserCollectionAssets(props)).body.assets);
  getUserCollectionsAssets = async (props: GetUserCollectionsAssetsProps) => ((await this.raw.getUserCollectionsAssets(props)).body.assets);
  getUserSlotAssets = async (props: GetUserSlotAssetsProps) => ((await this.raw.getUserSlotAssets(props)).body.assets);
  getUserSlotsAssets = async (props: GetUserSlotsAssetsProps) => ((await this.raw.getUserSlotsAssets(props)).body.assets);
  mintAssets = async (props: MintAssetsProps) => ((await this.raw.mintAssets(props)).success);
  sendAsset = async (props: SendAssetProps) => ((await this.raw.sendAsset(props)).body);
  sendAssets = async (props: SendAssetsProps) => ((await this.raw.sendAssets(props)).body);
  sendCollectionAssets = async (props: SendCollectionAssetsProps) => ((await this.raw.sendCollectionAssets(props)).body);
  sendLowestAsset = async (props: SendLowestAssetProps) => ((await this.raw.sendLowestAsset(props)).body);
  sendRandomAsset = async (props: SendRandomAssetProps) => ((await this.raw.sendRandomAsset(props)).body);
  updateAsset = async (props: UpdateAssetProps) => ((await this.raw.updateAsset(props)).body.assetId);
  updateAssets = async (props: UpdateAssetsProps) => ((await this.raw.updateAssets(props)).body.assetIds);
  updateCollectionAssets = async (props: UpdateCollectionAssetsProps) => ((await this.raw.updateCollectionAssets(props)).body.collectionId);
  updateAssetExpressionValue = async (props: UpdateAssetExpressionValueProps) => { return (await this.raw.updateAssetExpressionValue(props)).body.expressionValueId; }
  updateAssetsExpressionValue = async (props: UpdateAssetsExpressionValueProps) => { return (await this.raw.updateAssetsExpressionValue(props)).body.assetIds; }
  updateCollectionAssetsExpressionValue = async (props: UpdateCollectionAssetsExpressionValueProps) => { return (await this.raw.updateCollectionAssetsExpressionValue(props)).success; }
  updateBulkExpressionValues = async (props: UpdateBulkExpressionValuesProps) => { return (await this.raw.updateBulkExpressionValues(props)).body.log; }

  raw: RawAssetsHandlers = {
    getAsset: async (props) => this.request('/nft/info' + propsToQueryString(props)),
    getAssets: async (props) => this.request('/nft/info' + propsToQueryString(props)),
    getUserAssets: async (props) => this.request('/nft/user' + propsToQueryString(props)),
    getUserCollectionAssets: async (props) => this.request('/nft/collection' + propsToQueryString(props)),
    getUserCollectionsAssets: async (props) => this.request('/nft/collections' + propsToQueryString(props)),
    getUserSlotAssets: async (props) => this.request('/nft/slot' + propsToQueryString(props)),
    getUserSlotsAssets: async (props) => this.request('/nft/slots' + propsToQueryString(props)),
    mintAssets: async (props) => this.request('/asset/mint', { method: 'POST', body: JSON.stringify(props) }),
    sendAsset: async (props) => this.request('/asset/send', { method: 'POST', body: JSON.stringify(props) }),
    sendAssets: async (props) => this.request('/asset/send', { method: 'POST', body: JSON.stringify(props) }),
    sendCollectionAssets: async (props) => this.request('/asset/send', { method: 'POST', body: JSON.stringify(props) }),
    sendLowestAsset: async (props) => this.request('/asset/sendLowest', { method: 'POST', body: JSON.stringify(props) }),
    sendRandomAsset: async (props) => this.request('/asset/sendRandom', { method: 'POST', body: JSON.stringify(props) }),
    updateAsset: async (props) => this.request('/asset/update', { method: 'PUT', body: JSON.stringify(props) }),
    updateAssets: async (props) => this.request('/asset/update', { method: 'PUT', body: JSON.stringify(props) }),
    updateCollectionAssets: async (props) => this.request('/asset/update', { method: 'PUT', body: JSON.stringify(props) }),
    updateAssetExpressionValue: (props) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props) }),
    updateAssetsExpressionValue: (props) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props) }),
    updateCollectionAssetsExpressionValue: (props) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props) }),
    updateBulkExpressionValues: (props) => this.request('/asset/expressionValuesBulk', { method: 'POST', body: JSON.stringify(props) }),
  };

  safe: SafeAssetsHandlers = {
    getAsset: async (props) => {
      try { return { result: await this.getAsset(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAssets: async (props) => {
      try { return { result: await this.getAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserAssets: async (props) => {
      try { return { result: await this.getUserAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserCollectionAssets: async (props) => {
      try { return { result: await this.getUserCollectionAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserCollectionsAssets: async (props) => {
      try { return { result: await this.getUserCollectionsAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserSlotAssets: async (props) => {
      try { return { result: await this.getUserSlotAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserSlotsAssets: async (props) => {
      try { return { result: await this.getUserSlotsAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    mintAssets: async (props) => {
      try { return { result: await this.mintAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendAsset: async (props) => {
      try { return { result: await this.sendAsset(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendAssets: async (props) => {
      try { return { result: await this.sendAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendCollectionAssets: async (props) => {
      try { return { result: await this.sendCollectionAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendLowestAsset: async (props) => {
      try { return { result: await this.sendLowestAsset(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendRandomAsset: async (props) => {
      try { return { result: await this.sendRandomAsset(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAsset: async (props) => {
      try { return { result: await this.updateAsset(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssets: async (props) => {
      try { return { result: await this.updateAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateCollectionAssets: async (props) => {
      try { return { result: await this.updateCollectionAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssetExpressionValue: async (props) => {
      try { return { result: await this.updateAssetExpressionValue(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssetsExpressionValue: async (props) => {
      try { return { result: await this.updateAssetsExpressionValue(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateCollectionAssetsExpressionValue: async (props) => {
      try { return { result: await this.updateCollectionAssetsExpressionValue(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateBulkExpressionValues: async (props) => {
      try { return { result: await this.updateBulkExpressionValues(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}