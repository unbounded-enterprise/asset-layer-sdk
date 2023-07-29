import { Apps } from './resources/apps';
import { Assets } from './resources/assets';
import { Collections } from './resources/collections';
import { Equips } from './resources/equips';
import { Expressions } from './resources/expressions';
import { Listings } from './resources/listings';
import { Slots } from './resources/slots';
import { Users } from './resources/users';

export type AssetLayerConfig = {
  appSecret: string;
  baseUrl?: string;
}

export class AssetLayer {
  apps: Apps;
  assets: Assets;
  collections: Collections;
  equips: Equips;
  expressions: Expressions;
  listings: Listings;
  slots: Slots;
  users: Users;

  constructor(config: AssetLayerConfig) {
    this.apps = new Apps(config);
    this.assets = new Assets(config);
    this.collections = new Collections(config);
    this.equips = new Equips(config);
    this.expressions = new Expressions(config);
    this.listings = new Listings(config);
    this.slots = new Slots(config);
    this.users = new Users(config);
  }
}

export * from './types/app';
export * from './types/asset';
export * from './types/basic-types';
export * from './types/collection';
export * from './types/equip';
export * from './types/expression';
export * from './types/listing';
export * from './types/slot';
export * from './types/user';