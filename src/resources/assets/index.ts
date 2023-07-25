import { Base } from '../base';
import { Asset, AssetUpdate } from './types';

export class Assets extends Base {
  getAsset(id: string): Promise<Asset> {
    return this.request(`/asset/info?assetId=${id}`);
  }
  getAssets(ids: string[]): Promise<Asset[]> {
    return this.request(`/asset/info?assetIds=${ids}`);
  }
  /*
  updateAsset(update: AssetUpdate): Promise<boolean> {
    return this.request('/asset/update', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
  */

  // /collection
  // /mint
  // /send
  // /slots
  // /user
}