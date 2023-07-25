Manage your digital assets with the Asset Layer SDK

## Installation

First, install the SDK:

npm install dubby-sdk-test

## Reference the SDK

You can reference the SDK in two ways:

const { AssetLayer } = require('dubby-sdk-test');

OR

import { AssetLayer } from 'dubby-sdk-test';

## Instantiate the SDK

const assetlayer = new AssetLayer({
  appSecret: process.env.ASSETLAYER_APP_SECRET,
});

## Load an App

const app = await assetlayer.apps.getApp('633b30ca09d1acacd0c50df4');