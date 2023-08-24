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
    - [Login a User](#login-a-user)
    - [Initialize a User](#handling-an-active-session)
  - [Development](#sdk-development)
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
const assetlayer = new AssetLayer();
```

### Load an App

```js
const app = await assetlayer.apps.info({ appId: 'YOUR_APP_ID' });
```

By default, handlers return the payload and will throw Errors.
You can get the raw response by calling the raw handler as shown below:

```js
const response = await assetlayer.apps.raw.info({ appId: 'YOUR_APP_ID' });
```

The raw handlers can be useful in situations where more data from the response is required.
However, it can still throw an error, to fix that we can call the safe handler:

```js
const { result: app, error } = await assetlayer.apps.safe.info({ appId: 'YOUR_APP_ID' });
```

Some endpoints may have different return types depending on the provided properties.
For this reason, there are more specific handlers available:

```js
const appOrApps:App|App[] = await assetlayer.apps.info({ appId: 'YOUR_APP_ID', appIds: ['APP_ID_1', 'APP_ID_2'] });
const app:App = await assetlayer.apps.getApp({ appId: 'YOUR_APP_ID' });
const apps:App[] = await assetlayer.apps.getApps({ appIds: ['APP_ID_1', 'APP_ID_2'] });
```

These all call the same core endpoint (https://api-v2.assetlayer.com/api/v1/app/info),
but getApp & getApps offer stricter type security when passing props and returning values.
Typescript is highly recommended and the sdk includes extensive typings,
useful for referencing & importing, allowing for turn-key type-safe app development.


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

You can also directly pass in a did token (unregistered).
With this method you can await the response:

```js
const success = await assetlayer.loginUser({ didToken });
```

You can also pass it a pre-registered didtoken:

```js
const success = await assetlayer.loginUser({ registeredDidToken });
```

If not passing a didToken, awaiting the response is not effective.
To receive an update after success you can pass in an onSuccess handler:

```js
assetlayer.loginUser({ onSuccess: async () => console.log(await assetlayer.users.getUser()) });
```

### Logout a User

```js
assetlayer.logoutUser();
```

### Handling an active session

Using initialize, you can sign in a user if there's already an active session:

```js
const loggedIn = await assetlayer.initialize();
```

This will return whether or not the user was successfully logged in.
You can also pass it an onComplete handler:

```js
assetlayer.initialize((loggedIn) => { if (!loggedIn) assetlayer.loginUser(); });
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
