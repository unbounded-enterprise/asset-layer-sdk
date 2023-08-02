[![npm version](https://badge.fury.io/js/isomorphic-unfetch.svg)](https://badge.fury.io/js/isomorphic-unfetch)

# Project Name

> Manage digital assets for your application with [Asset Layer](https://www.assetlayer.com). This SDK provides a turn-key solution for integrating your client / server with the [Asset Layer API](https://docs.assetlayer.com).

## Prerequisites

This project requires NodeJS and NPM.

## Table of contents

- [Project Name](#project-name)
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
$ npm install @assetlayer/sdk
```

Or if you prefer using Yarn:

```sh
$ yarn add @assetlayer/sdk
```

## Usage

### Reference the SDK

You can reference the SDK in two ways:

```sh
import { AssetLayer } from '@assetlayer/sdk';
```

OR

```sh
const { AssetLayer } = require('@assetlayer/sdk');
```

### Instantiate the SDK

```sh
const assetlayer = new AssetLayer({
  appSecret: process.env.ASSETLAYER_APP_SECRET,
});
```

### Load an App

```sh
const app = await assetlayer.apps.getApp({ appId: '633b30ca09d1acacd0c50df4' });
```

## Development

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
