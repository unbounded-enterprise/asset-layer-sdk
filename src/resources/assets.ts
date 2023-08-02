import { Base } from './base';
import { Asset, UpdateAssetProps, GetUserCollectionAssetsProps, GetUserCollectionsAssetsProps, GetUserSlotAssetsProps, GetUserSlotsAssetsProps, GetAssetProps, GetAssetsProps, GetUserAssetsProps, MintAssetsProps, SendAssetProps, SendAssetsProps, SendCollectionAssetsProps, SendLowestAssetProps, SendRandomAssetProps, GetAssetsResponse, SendAssetResponse, SendAssetsResponse, UpdateAssetResponse, UpdateAssetsResponse, UpdateCollectionAssetsResponse, SendAssetBody, SendAssetsBody } from '../types/asset';
import { propsToQueryString } from 'src/utils/basic-format';
import { BasicResult, BasicSuccessResponse } from 'src/types/basic-types';
import { parseBasicError } from 'src/utils/basic-error';

export class Assets extends Base {
  getAsset = async (props: GetAssetProps): Promise<Asset> => ((await this.raw.getAsset(props)).body.assets[0]);
  getAssets = async (props: GetAssetsProps): Promise<Asset[]> => ((await this.raw.getAssets(props)).body.assets);
  getUserAssets = async (props: GetUserAssetsProps): Promise<Asset[]> => ((await this.raw.getUserAssets(props)).body.assets);
  getUserCollectionAssets = async (props: GetUserCollectionAssetsProps): Promise<Asset[]> => ((await this.raw.getUserCollectionAssets(props)).body.assets);
  getUserCollectionsAssets = async (props: GetUserCollectionsAssetsProps): Promise<Asset[]> => ((await this.raw.getUserCollectionsAssets(props)).body.assets);
  getUserSlotAssets = async (props: GetUserSlotAssetsProps): Promise<Asset[]> => ((await this.raw.getUserSlotAssets(props)).body.assets);
  getUserSlotsAssets = async (props: GetUserSlotsAssetsProps): Promise<Asset[]> => ((await this.raw.getUserSlotsAssets(props)).body.assets);
  mintAssets = async (props: MintAssetsProps): Promise<boolean> => ((await this.raw.mintAssets(props)).success);
  sendAsset = async (props: SendAssetProps): Promise<SendAssetBody> => ((await this.raw.sendAsset(props)).body);
  sendAssets = async (props: SendAssetsProps): Promise<SendAssetsBody> => ((await this.raw.sendAssets(props)).body);
  sendCollectionAssets = async (props: SendCollectionAssetsProps): Promise<SendAssetsBody> => ((await this.raw.sendCollectionAssets(props)).body);
  sendLowestAsset = async (props: SendLowestAssetProps): Promise<SendAssetBody> => ((await this.raw.sendLowestAsset(props)).body);
  sendRandomAsset = async (props: SendRandomAssetProps): Promise<SendAssetBody> => ((await this.raw.sendRandomAsset(props)).body);
  updateAsset = async (update: UpdateAssetProps): Promise<string> => ((await this.raw.updateAsset(update)).body.assetId);
  updateAssets = async (update: UpdateAssetProps): Promise<string[]> => ((await this.raw.updateAssets(update)).body.assetIds);
  updateCollectionAssets = async (update: UpdateAssetProps): Promise<string> => ((await this.raw.updateCollectionAssets(update)).body.collectionId);

  raw = {
    getAsset: (props: GetAssetProps) => this.request<GetAssetsResponse>('/nft/info' + propsToQueryString(props)),
    getAssets: (props: GetAssetsProps) => this.request<GetAssetsResponse>('/nft/info' + propsToQueryString(props)),
    getUserAssets: (props: GetUserAssetsProps) => this.request<GetAssetsResponse>('/nft/user' + propsToQueryString(props)),
    getUserCollectionAssets: (props: GetUserCollectionAssetsProps) => this.request<GetAssetsResponse>('/nft/collection' + propsToQueryString(props)),
    getUserCollectionsAssets: (props: GetUserCollectionsAssetsProps) => this.request<GetAssetsResponse>('/nft/collections' + propsToQueryString(props)),
    getUserSlotAssets: (props: GetUserSlotAssetsProps) => this.request<GetAssetsResponse>('/nft/slot' + propsToQueryString(props)),
    getUserSlotsAssets: (props: GetUserSlotsAssetsProps) => this.request<GetAssetsResponse>('/nft/slots' + propsToQueryString(props)),
    mintAssets: (props: MintAssetsProps) => this.request<BasicSuccessResponse>('/asset/mint', { method: 'POST', body: JSON.stringify(props) }),
    sendAsset: (props: SendAssetProps) => this.request<SendAssetResponse>('/asset/send', { method: 'POST', body: JSON.stringify(props) }),
    sendAssets: (props: SendAssetsProps) => this.request<SendAssetsResponse>('/asset/send', { method: 'POST', body: JSON.stringify(props) }),
    sendCollectionAssets: (props: SendCollectionAssetsProps) => this.request<SendAssetsResponse>('/asset/send', { method: 'POST', body: JSON.stringify(props) }),
    sendLowestAsset: (props: SendLowestAssetProps) => this.request<SendAssetResponse>('/asset/sendLowest', { method: 'POST', body: JSON.stringify(props) }),
    sendRandomAsset: (props: SendRandomAssetProps) => this.request<SendAssetResponse>('/asset/sendRandom', { method: 'POST', body: JSON.stringify(props) }),
    updateAsset: (update: UpdateAssetProps) => this.request<UpdateAssetResponse>('/asset/update', { method: 'PUT', body: JSON.stringify(update) }),
    updateAssets: (update: UpdateAssetProps) => this.request<UpdateAssetsResponse>('/asset/update', { method: 'PUT', body: JSON.stringify(update) }),
    updateCollectionAssets: (update: UpdateAssetProps) => this.request<UpdateCollectionAssetsResponse>('/asset/update', { method: 'PUT', body: JSON.stringify(update) }),
  };

  safe = {
    getAsset: async (props: GetAssetProps): Promise<BasicResult<Asset>> => {
      try { return { result: await this.getAsset(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getAssets: async (props: GetAssetsProps): Promise<BasicResult<Asset[]>> => {
      try { return { result: await this.getAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserAssets: async (props: GetUserAssetsProps): Promise<BasicResult<Asset[]>> => {
      try { return { result: await this.getUserAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserCollectionAssets: async (props: GetUserCollectionAssetsProps): Promise<BasicResult<Asset[]>> => {
      try { return { result: await this.getUserCollectionAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserCollectionsAssets: async (props: GetUserCollectionsAssetsProps): Promise<BasicResult<Asset[]>> => {
      try { return { result: await this.getUserCollectionsAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserSlotAssets: async (props: GetUserSlotAssetsProps): Promise<BasicResult<Asset[]>> => {
      try { return { result: await this.getUserSlotAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserSlotsAssets: async (props: GetUserSlotsAssetsProps): Promise<BasicResult<Asset[]>> => {
      try { return { result: await this.getUserSlotsAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    mintAssets: async (props: MintAssetsProps): Promise<BasicResult<boolean>> => {
      try { return { result: await this.mintAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendAsset: async (props: SendAssetProps): Promise<BasicResult<SendAssetBody>> => {
      try { return { result: await this.sendAsset(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendAssets: async (props: SendAssetsProps): Promise<BasicResult<SendAssetsBody>> => {
      try { return { result: await this.sendAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendCollectionAssets: async (props: SendCollectionAssetsProps): Promise<BasicResult<SendAssetsBody>> => {
      try { return { result: await this.sendCollectionAssets(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendLowestAsset: async (props: SendLowestAssetProps): Promise<BasicResult<SendAssetBody>> => {
      try { return { result: await this.sendLowestAsset(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    sendRandomAsset: async (props: SendRandomAssetProps): Promise<BasicResult<SendAssetBody>> => {
      try { return { result: await this.sendRandomAsset(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAsset: async (update: UpdateAssetProps): Promise<BasicResult<string>> => {
      try { return { result: await this.updateAsset(update) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssets: async (update: UpdateAssetProps): Promise<BasicResult<string[]>> => {
      try { return { result: await this.updateAssets(update) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateCollectionAssets: async (update: UpdateAssetProps): Promise<BasicResult<string>> => {
      try { return { result: await this.updateCollectionAssets(update) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}