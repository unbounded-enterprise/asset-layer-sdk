import { Base } from './base';
import { Expression, CreateExpressionProps, UpdateExpressionProps, UpdateAssetExpressionValueProps, UpdateAssetsExpressionValueProps, UpdateCollectionAssetsExpressionValueProps, UpdateBulkExpressionValuesProps, GetSlotExpressionsProps, RawExpressionsHandlers, SafeExpressionsHandlers } from '../types/expression';
import { propsToQueryString } from 'src/utils/basic-format';
import { parseBasicError } from 'src/utils/basic-error';

export class Expressions extends Base {
  // getExpression = async (props: GetExpressionProps, headers?: HeadersInit) => { return (await this.raw.getExpression(props)).body.expression; }
  // getExpressions = async (props: GetExpressionsProps, headers?: HeadersInit) => { return (await this.raw.getExpressions(props)).body.expressions; }

  getExpressionTypes = async () => { return (await this.raw.getExpressionTypes()).body.expressionTypes; }
  getSlotExpressions = async (props: GetSlotExpressionsProps, headers?: HeadersInit) => { return (await this.raw.getSlotExpressions(props, headers)).body.expressions; }
  createExpression = async (props: CreateExpressionProps, headers?: HeadersInit) => { return (await this.raw.createExpression(props, headers)).body.expressionId; }
  updateExpression = async (props: UpdateExpressionProps, headers?: HeadersInit) => { return (await this.raw.updateExpression(props, headers)).success; }

  updateAssetExpressionValue = async (props: UpdateAssetExpressionValueProps, headers?: HeadersInit) => { return (await this.raw.updateAssetExpressionValue(props, headers)).body.expressionValueId; }
  updateAssetsExpressionValue = async (props: UpdateAssetsExpressionValueProps, headers?: HeadersInit) => { return (await this.raw.updateAssetsExpressionValue(props, headers)).body.assetIds; }
  updateCollectionAssetsExpressionValue = async (props: UpdateCollectionAssetsExpressionValueProps, headers?: HeadersInit) => { return (await this.raw.updateCollectionAssetsExpressionValue(props, headers)).success; }
  updateBulkExpressionValues = async (props: UpdateBulkExpressionValuesProps, headers?: HeadersInit) => { return (await this.raw.updateBulkExpressionValues(props, headers)).body.log; }

  raw: RawExpressionsHandlers = {
    // getExpression: async (props) => this.request('/expression/info' + propsToQueryString(props), { headers }),
    // getExpressions: async (props) => this.request('/expression/info' + propsToQueryString(props), { headers }),

    getExpressionTypes: async () => this.request('slot/expressions/types'),
    getSlotExpressions: async (props, headers) => this.request('/slot/expressions' + propsToQueryString(props), { headers }),
    createExpression: async (props, headers) => this.request('/slot/expressions/new', { method: 'POST', body: JSON.stringify(props), headers }),
    updateExpression: async (props, headers) => this.request('slot/expressions/update', { method: 'PUT', body: JSON.stringify(props), headers }),

    updateAssetExpressionValue: async (props, headers) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }),
    updateAssetsExpressionValue: async (props, headers) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }),
    updateCollectionAssetsExpressionValue: async (props, headers) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props), headers }),
    updateBulkExpressionValues: async (props, headers) => this.request('/asset/expressionValuesBulk', { method: 'POST', body: JSON.stringify(props), headers }),
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
    getSlotExpressions: async (props, headers) => {
      try { return { result: await this.getSlotExpressions(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    createExpression: async (props, headers) => {
      try { return { result: await this.createExpression(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateExpression: async (props, headers) => {
      try { return { result: await this.updateExpression(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },

    updateAssetExpressionValue: async (props, headers) => {
      try { return { result: await this.updateAssetExpressionValue(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssetsExpressionValue: async (props, headers) => {
      try { return { result: await this.updateAssetsExpressionValue(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
      updateCollectionAssetsExpressionValue: async (props, headers) => {
      try { return { result: await this.updateCollectionAssetsExpressionValue(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateBulkExpressionValues: async (props, headers) => {
      try { return { result: await this.updateBulkExpressionValues(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}