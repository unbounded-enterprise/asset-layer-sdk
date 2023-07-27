import { Base } from './base';
import { Asset, UpdateAssetProps, GetUserCollectionAssetsProps, GetUserCollectionsAssetsProps, GetUserSlotAssetsProps, GetUserSlotsAssetsProps } from '../types/asset';

export class Assets extends Base {
  getAsset(id: string): Promise<Asset> {
    return this.request(`/nft/info?nftId=${id}`);
  }
  getAssets(ids: string[]): Promise<Asset[]> {
    return this.request(`/nft/info?nftIds=${ids}`);
  }
  getUserAssets(handle: string, idOnly: boolean = false, countsOnly: boolean = false): Promise<Asset[]> {
    return this.request(`/nft/user?handle=${handle}&idOnly=${idOnly}&countsOnly=${countsOnly}`);
  }
  getUserCollectionAssets(update: GetUserCollectionAssetsProps): Promise<Asset[]> {
    return this.request('/nft/collection', {
      method: 'GET',
      body: JSON.stringify(update),
    });
  }
  getUserCollectionsAssets(update: GetUserCollectionsAssetsProps): Promise<Asset[]> {
    return this.request('/nft/collections', {
      method: 'GET',
      body: JSON.stringify(update),
    });
  }
  getUserSlotAssets(update: GetUserSlotAssetsProps): Promise<Asset[]> {
    return this.request('/nft/slot', {
      method: 'GET',
      body: JSON.stringify(update),
    });
  }
  getUserSlotsAssets(update: GetUserSlotsAssetsProps): Promise<Asset[]> {
    return this.request('/nft/slots', {
      method: 'GET',
      body: JSON.stringify(update),
    });
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