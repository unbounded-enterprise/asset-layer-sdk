import { Apps } from './resources/apps';
import { Assets } from './resources/assets';
import { Collections } from './resources/collections';
import { Expressions } from './resources/expressions';
import { Listings } from './resources/listings';
import { Slots } from './resources/slots';
import { Users } from './resources/users';

type AssetLayerConfig = {
  appSecret: string;
  baseUrl?: string;
}

export class AssetLayer {
  apps: Apps;
  assets: Assets;
  collections: Collections;
  expressions: Expressions;
  listings: Listings;
  slots: Slots;
  users: Users;

  constructor(config: AssetLayerConfig) {
    this.apps = new Apps(config);
    this.assets = new Assets(config);
    this.collections = new Collections(config);
    this.expressions = new Expressions(config);
    this.listings = new Listings(config);
    this.slots = new Slots(config);
    this.users = new Users(config);
  }
}