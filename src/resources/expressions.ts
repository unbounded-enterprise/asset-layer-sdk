import { Base } from './base';
import { Expression, CreateExpressionProps, UpdateExpressionProps, UpdateAssetExpressionValueProps, UpdateAssetsExpressionValueProps, UpdateCollectionAssetsExpressionValueProps, UpdateBulkExpressionValuesProps, GetSlotExpressionsProps, RawExpressionsHandlers, SafeExpressionsHandlers } from '../types/expression';
import { propsToQueryString } from 'src/utils/basic-format';
import { parseBasicError } from 'src/utils/basic-error';

export class Expressions extends Base {
  // getExpression = async (props: GetExpressionProps) => { return (await this.raw.getExpression(props)).body.expression; }
  // getExpressions = async (props: GetExpressionsProps) => { return (await this.raw.getExpressions(props)).body.expressions; }

  getExpressionTypes = async () => { return (await this.raw.getExpressionTypes()).body.expressionTypes; }
  getSlotExpressions = async (props: GetSlotExpressionsProps) => { return (await this.raw.getSlotExpressions(props)).body.expressions; }
  createExpression = async (props: CreateExpressionProps) => { return (await this.raw.createExpression(props)).body.expressionId; }
  updateExpression = async (props: UpdateExpressionProps) => { return (await this.raw.updateExpression(props)).success; }

  updateAssetExpressionValue = async (props: UpdateAssetExpressionValueProps) => { return (await this.raw.updateAssetExpressionValue(props)).body.expressionValueId; }
  updateAssetsExpressionValue = async (props: UpdateAssetsExpressionValueProps) => { return (await this.raw.updateAssetsExpressionValue(props)).body.assetIds; }
  updateCollectionAssetsExpressionValue = async (props: UpdateCollectionAssetsExpressionValueProps) => { return (await this.raw.updateCollectionAssetsExpressionValue(props)).success; }
  updateBulkExpressionValues = async (props: UpdateBulkExpressionValuesProps) => { return (await this.raw.updateBulkExpressionValues(props)).body.log; }

  raw: RawExpressionsHandlers = {
    // getExpression: (props) => this.request('/expression/info' + propsToQueryString(props)),
    // getExpressions: (props) => this.request('/expression/info' + propsToQueryString(props)),

    getExpressionTypes: () => this.request('slot/expressions/types'),
    getSlotExpressions: (props) => this.request('/slot/expressions' + propsToQueryString(props)),
    createExpression: (props) => this.request('/slot/expressions/new', { method: 'POST', body: JSON.stringify(props) }),
    updateExpression: (props) => this.request('slot/expressions/update', { method: 'PUT', body: JSON.stringify(props) }),

    updateAssetExpressionValue: (props) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props) }),
    updateAssetsExpressionValue: (props) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props) }),
    updateCollectionAssetsExpressionValue: (props) => this.request('/asset/expressionValues', { method: 'POST', body: JSON.stringify(props) }),
    updateBulkExpressionValues: (props) => this.request('/asset/expressionValuesBulk', { method: 'POST', body: JSON.stringify(props) }),
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
    getSlotExpressions: async (props) => {
      try { return { result: await this.getSlotExpressions(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    createExpression: async (props) => {
      try { return { result: await this.createExpression(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateExpression: async (props) => {
      try { return { result: await this.updateExpression(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },

    updateAssetExpressionValue: async (props) => {
      try { return { result: await this.updateAssetExpressionValue(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssetsExpressionValue: async (props) => {
      try { return { result: await this.updateAssetsExpressionValue(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
      updateCollectionAssetsExpressionValue: async (props) => {
      try { return { result: await this.updateCollectionAssetsExpressionValue(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateBulkExpressionValues: async (props) => {
      try { return { result: await this.updateBulkExpressionValues(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}