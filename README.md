[![npm version](https://badge.fury.io/js/isomorphic-unfetch.svg)](https://badge.fury.io/js/isomorphic-unfetch)
[![npm version](https://badge.fury.io/js/magic-sdk.svg)](https://badge.fury.io/js/magic-sdk)

# Asset Layer Client SDK

> Manage digital assets for your application with [Asset Layer](https://www.assetlayer.com). This Client SDK provides a turn-key solution for integrating your application with Magic Auth and a proxy server.

## Prerequisites

This project requires NodeJS and NPM.

## Table of contents

- [Asset Layer Client SDK](#asset-layer-client-sdk)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Reference the SDK](#reference-the-sdk)
    - [Instantiate the SDK](#instantiate-the-sdk)
    - [Load an App](#load-an-app)
  - [Development](#development)
    - [Building a distribution version](#building-a-distribution-version)
    - [Deploying to NPM](#deploying-to-npm)

## Getting Started

These instructions will help getting started managing your digital assets with [Asset Layer](https://www.assetlayer.com).

## Installation

To install and set up the library, run:

```sh
$ npm install @assetlayer/sdk-client
```

Or if you prefer using Yarn:

```sh
$ yarn add @assetlayer/sdk-client
```

## Usage

### Reference the SDK

You can reference the SDK in two ways:

```js
import { AssetLayer } from '@assetlayer/sdk-client';
```

OR

```js
const { AssetLayer } = require('@assetlayer/sdk-client');
```

### Instantiate the SDK

```js
const assetlayer = new AssetLayer({
  appSecret: process.env.ASSETLAYER_APP_SECRET,
});
```

### Load an App

```js
const app = await assetlayer.apps.getApp({ appId: '633b30ca09d1acacd0c50df4' });
```

By default, handlers return the payload and will throw Errors.
You can get the raw response by calling the raw handler as shown below:

```js
const response = await assetlayer.apps.raw.getApp({ appId: '633b30ca09d1acacd0c50df4' });
```

The raw handlers can be useful in situations where more data from the response is required.
However, it can still throw an error, to fix that we can call the safe handler as shown below:

```js
const { result: app, error } = await assetlayer.apps.safe.getApp({ appId: '633b30ca09d1acacd0c50df4' });
```

### Login a User

Logging in a user is as simple as:

```js
assetlayer.loginUser();
```

This will trigger a prompt for the user to sign-in. 
You can skip the email prompt by providing an email like so:

```js
assetlayer.loginUser({ email });
```

And to logout:

```js
assetlayer.logoutUser();
```

## SDK Development

### Connecting with the Org

```sh
$ npm init --scope=assetlayer
```

### Building a distribution version

```sh
$ npm run build
```

This task will use microbundle to create a distribution version of the project
inside your local `dist/` folder

### Deploying to NPM

```sh
$ npm login

$ npm publish --access public
```
