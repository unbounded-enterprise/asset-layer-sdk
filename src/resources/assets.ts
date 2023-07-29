import { Base } from './base';
import { Asset, UpdateAssetProps, GetUserCollectionAssetsProps, GetUserCollectionsAssetsProps, GetUserSlotAssetsProps, GetUserSlotsAssetsProps } from '../types/asset';
import { propsToQueryString } from 'src/utils/basic-format';

export class Assets extends Base {
  getAsset(assetId: string): Promise<Asset> {
    return this.request(`/nft/info?nftId=${assetId}`);
  }
  getAssets(assetIds: string[]): Promise<Asset[]> {
    return this.request('/nft/info' + propsToQueryString({ nftIds: assetIds }));
  }
  getUserAssets(handle: string, idOnly: boolean = false, countsOnly: boolean = false): Promise<Asset[]> {
    return this.request(`/nft/user?handle=${handle}&idOnly=${idOnly}&countsOnly=${countsOnly}`);
  }
  getUserCollectionAssets(props: GetUserCollectionAssetsProps): Promise<Asset[]> {
    return this.request('/nft/collection' + propsToQueryString(props));
  }
  getUserCollectionsAssets(props: GetUserCollectionsAssetsProps): Promise<Asset[]> {
    return this.request('/nft/collections' + propsToQueryString(props));
  }
  getUserSlotAssets(props: GetUserSlotAssetsProps): Promise<Asset[]> {
    return this.request('/nft/slot' + propsToQueryString(props));
  }
  getUserSlotsAssets(props: GetUserSlotsAssetsProps): Promise<Asset[]> {
    return this.request('/nft/slots' + propsToQueryString(props));
  }
  mintAssets(collectionId: string, amount: number, handle: string): Promise<boolean> {
    return this.request('/asset/mint', {
      method: 'POST',
      body: JSON.stringify({ collectionId, number: amount, handle }),
    });
  }
  sendAsset(recipientHandle: string, nftId: string, handle: string): Promise<boolean> {
    return this.request('/asset/send', {
      method: 'POST',
      body: JSON.stringify({ recipientHandle, nftId, handle }),
    });
  }
  sendAssets(recipientHandle: string, nftIds: string[], handle: string): Promise<boolean> {
    return this.request('/asset/send', {
      method: 'POST',
      body: JSON.stringify({ recipientHandle, nftIds, handle }),
    });
  }
  sendCollectionAssets(recipientHandle: string, collectionId: string, handle: string): Promise<boolean> {
    return this.request('/asset/send', {
      method: 'POST',
      body: JSON.stringify({ recipientHandle, collectionId, handle }),
    });
  }
  sendLowestAsset(recipientHandle: string, collectionId: string, handle: string): Promise<boolean> {
    return this.request('/asset/sendLowest', {
      method: 'POST',
      body: JSON.stringify({ recipientHandle, collectionId, handle }),
    });
  }
  sendRandomAsset(recipientHandle: string, collectionId: string, handle: string): Promise<boolean> {
    return this.request('/asset/sendRandom', {
      method: 'POST',
      body: JSON.stringify({ recipientHandle, collectionId, handle }),
    });
  }
  updateAsset(update: UpdateAssetProps): Promise<boolean> {
    return this.request('/asset/update', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
}