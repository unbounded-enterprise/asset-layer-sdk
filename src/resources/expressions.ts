import type { CreateExpressionProps, UpdateExpressionProps, UpdateAssetExpressionValueProps, UpdateAssetsExpressionValueProps, UpdateCollectionAssetsExpressionValueProps, UpdateBulkExpressionValuesProps, GetSlotExpressionsProps, RawExpressionsHandlers, SafeExpressionsHandlers, UpdateExpressionValuesProps, UpdateAssetsExpressionValueResponse, UpdateAssetExpressionValueResponse } from '../types/expression';
import { AssetLayerRequestOptions, Base } from './base';
import { propsToQueryString } from '../utils/basic-format';
import { parseBasicError } from '../utils/basic-error';

export class Expressions extends Base {
  // getExpression = async (props: GetExpressionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.getExpression(props)).body.expression; }
  // getExpressions = async (props: GetExpressionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.getExpressions(props)).body.expressions; }

  getExpressionTypes = async () => { return (await this.raw.getExpressionTypes()).body.expressionTypes; }
  getSlotExpressions = async (props: GetSlotExpressionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.getSlotExpressions(props, headers, options)).body.expressions; }
  createExpression = async (props: CreateExpressionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.createExpression(props, headers, options)).body.expressionId; }
  updateExpression = async (props: UpdateExpressionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.updateExpression(props, headers, options)).success; }

  updateExpressionValues = async (props: UpdateExpressionValuesProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { 
    const response = await this.raw.updateExpressionValues(props, headers, options);
    return (props.collectionId) ? response.success 
      : (props.assetIds) ? (response as UpdateAssetsExpressionValueResponse).body.assetIds 
      : (response as UpdateAssetExpressionValueResponse).body.expressionValueId; 
  }
  updateAssetExpressionValue = async (props: UpdateAssetExpressionValueProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.updateAssetExpressionValue(props, headers, options)).body.expressionValueId; }
  updateAssetsExpressionValue = async (props: UpdateAssetsExpressionValueProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.updateAssetsExpressionValue(props, headers, options)).body.assetIds; }
  updateCollectionAssetsExpressionValue = async (props: UpdateCollectionAssetsExpressionValueProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.updateCollectionAssetsExpressionValue(props, headers, options)).success; }
  updateBulkExpressionValues = async (props: UpdateBulkExpressionValuesProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.updateBulkExpressionValues(props, headers, options)).body.log; }

  raw: RawExpressionsHandlers = {
    // getExpression: async (props) => this.request('/expression/info' + propsToQueryString(props), { headers }, options),
    // getExpressions: async (props) => this.request('/expression/info' + propsToQueryString(props), { headers }, options),

    getExpressionTypes: async () => this.request('/slot/expressions/types'),
    getSlotExpressions: async (props, headers, options) => this.request('/slot/expressions' + propsToQueryString(props), { headers }, options),
    createExpression: async (props, headers, options) => this.request('/slot/expressions/new', { method: 'POST', body: JSON.stringify(props), headers }, options),
    updateExpression: async (props, headers, options) => this.request('/slot/expressions/update', { method: 'PUT', body: JSON.stringify(props), headers }, options),

    updateExpressionValues: async (props, headers, options) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }, options),
    updateAssetExpressionValue: async (props, headers, options) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }, options),
    updateAssetsExpressionValue: async (props, headers, options) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }, options),
    updateCollectionAssetsExpressionValue: async (props, headers, options) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }, options),
    updateBulkExpressionValues: async (props, headers, options) => this.request('/asset/expressionValuesBulk', { method: 'POST', body: JSON.stringify(props), headers }, options),
  };

  safe: SafeExpressionsHandlers = {
    // getExpression: async (props) => {
    //   try { return { result: await this.getExpression(props) }; }
    //   catch (e) { return { error: parseBasicError(e) }; } },
    // getExpressions: async (props) => {
    //   try { return { result: await this.getExpressions(props) }; }
    //   catch (e) { return { error: parseBasicError(e) }; } },

    getExpressionTypes: async () => {
      try { return { result: await this.getExpressionTypes() }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getSlotExpressions: async (props, headers, options) => {
      try { return { result: await this.getSlotExpressions(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    createExpression: async (props, headers, options) => {
      try { return { result: await this.createExpression(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateExpression: async (props, headers, options) => {
      try { return { result: await this.updateExpression(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },

    updateExpressionValues: async (props, headers, options) => {
      try { return { result: await this.updateExpressionValues(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssetExpressionValue: async (props, headers, options) => {
      try { return { result: await this.updateAssetExpressionValue(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssetsExpressionValue: async (props, headers, options) => {
      try { return { result: await this.updateAssetsExpressionValue(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateCollectionAssetsExpressionValue: async (props, headers, options) => {
      try { return { result: await this.updateCollectionAssetsExpressionValue(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateBulkExpressionValues: async (props, headers, options) => {
      try { return { result: await this.updateBulkExpressionValues(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}