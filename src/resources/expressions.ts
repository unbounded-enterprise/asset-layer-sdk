import { Base } from './base';
import { Expression, CreateExpressionProps, UpdateExpressionProps, UpdateAssetExpressionValueProps, UpdateAssetsExpressionValueProps, UpdateCollectionExpressionValueProps, UpdateBulkExpressionValuesProps, GetSlotExpressionsProps, RawExpressionsHandlers, SafeExpressionsHandlers } from '../types/expression';
import { propsToQueryString } from 'src/utils/basic-format';
import { parseBasicError } from 'src/utils/basic-error';

export class Expressions extends Base {
  getExpressionTypes = async () => { return (await this.raw.getExpressionTypes()).body.expressionTypes; }
  // getExpression = async (props: GetExpressionProps) => { return (await this.raw.getExpression(props)).body.expression; }
  // getExpressions = async (props: GetExpressionsProps) => { return (await this.raw.getExpressions(props)).body.expressions; }
  getSlotExpressions = async (props: GetSlotExpressionsProps) => { return (await this.raw.getSlotExpressions(props)).body.expressions; }
  createExpression = async (props: CreateExpressionProps) => { return (await this.raw.createExpression(props)).body.expressionId; }
  updateAssetExpressionValue = async (props: UpdateAssetExpressionValueProps) => { return (await this.raw.updateAssetExpressionValue(props)).body.expressionValueId; }
  updateAssetsExpressionValue = async (props: UpdateAssetsExpressionValueProps) => { return (await this.raw.updateAssetsExpressionValue(props)).body.assetIds; }
  updateCollectionExpressionValue = async (props: UpdateCollectionExpressionValueProps) => { return (await this.raw.updateCollectionExpressionValue(props)).success; }
  updateBulkExpressionValues = async (props: UpdateBulkExpressionValuesProps) => { return (await this.raw.updateBulkExpressionValues(props)).body.log; }
  updateExpression = async (props: UpdateExpressionProps) => { return (await this.raw.updateExpression(props)).success; }

  raw: RawExpressionsHandlers = {
    getExpressionTypes: () => this.request('/expression/types'),
    // getExpression: (props) => this.request('/expression/info' + propsToQueryString(props)),
    // getExpressions: (props) => this.request('/expression/info' + propsToQueryString(props)),
    getSlotExpressions: (props) => this.request('/expression/slot' + propsToQueryString(props)),
    createExpression: (props) => this.request('/expression/new', { method: 'POST', body: JSON.stringify(props) }),
    updateAssetExpressionValue: (props) => this.request('/expression/values/nft', { method: 'POST', body: JSON.stringify(props) }),
    updateAssetsExpressionValue: (props) => this.request('/expression/values/nfts', { method: 'POST', body: JSON.stringify(props) }),
    updateCollectionExpressionValue: (props) => this.request('/expression/values/collection', { method: 'POST', body: JSON.stringify(props) }),
    updateBulkExpressionValues: (props) => this.request('/expression/values/bulk', { method: 'POST', body: JSON.stringify(props) }),
    updateExpression: (props) => this.request('/expression/update', { method: 'PUT', body: JSON.stringify(props) }),
  };

  safe: SafeExpressionsHandlers = {
    getExpressionTypes: async () => {
      try { return { result: await this.getExpressionTypes() }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    // getExpression: async (props) => {
    //   try { return { result: await this.getExpression(props) }; }
    //   catch (e) { return { error: parseBasicError(e) }; } },
    // getExpressions: async (props) => {
    //   try { return { result: await this.getExpressions(props) }; }
    //   catch (e) { return { error: parseBasicError(e) }; } },
    getSlotExpressions: async (props) => {
      try { return { result: await this.getSlotExpressions(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    createExpression: async (props) => {
      try { return { result: await this.createExpression(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssetExpressionValue: async (props) => {
      try { return { result: await this.updateAssetExpressionValue(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateAssetsExpressionValue: async (props) => {
      try { return { result: await this.updateAssetsExpressionValue(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateCollectionExpressionValue: async (props) => {
      try { return { result: await this.updateCollectionExpressionValue(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateBulkExpressionValues: async (props) => {
      try { return { result: await this.updateBulkExpressionValues(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    updateExpression: async (props) => {
      try { return { result: await this.updateExpression(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}