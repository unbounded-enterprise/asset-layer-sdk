import type { SlotCollectionsProps, GetSlotCollectionsProps, GetSlotProps, RawSlotsHandlers, SafeSlotsHandlers } from '../types/slot';
import type { CreateExpressionProps, GetSlotExpressionsProps, UpdateExpressionProps } from '../types/expression';
import { AssetLayerRequestOptions, Base } from './base';
import { propsToQueryString } from '../utils/basic-format';
import { parseBasicError } from '../utils/basic-error';

export class Slots extends Base {
  getSlot = async (props: GetSlotProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getSlot(props, headers, options)).body.slot);
  collections = async (props: SlotCollectionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.collections(props, headers, options)).body.slot.collections);
  getSlotCollections = async (props: GetSlotCollectionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getSlotCollections(props, headers, options)).body.slot.collections);
  getSlotCollectionIds = async (props: GetSlotCollectionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => ((await this.raw.getSlotCollectionIds(props, headers, options)).body.slot.collections);

  getExpressionTypes = async () => { return (await this.raw.getExpressionTypes()).body.expressionTypes; }
  getSlotExpressions = async (props: GetSlotExpressionsProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.getSlotExpressions(props, headers, options)).body.expressions; }
  createExpression = async (props: CreateExpressionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.createExpression(props, headers, options)).body.expressionId; }
  updateExpression = async (props: UpdateExpressionProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.updateExpression(props, headers, options)).success; }

  /* does not exist
  getSlots(ids: string[]): Promise<Slot[]> {
    return this.request(`/slot/info?slotIds=${ids}`);
  }
  */

  /* exists, not in scope
  updateSlot(update: unknown): Promise<boolean> {
    return this.request('/slot/update', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
  */

  raw: RawSlotsHandlers = {
    getSlot: async (props, headers, options) => this.request('/slot/info' + propsToQueryString(props), { headers }, options),
    collections: async (props, headers, options) => this.request('/slot/collections' + propsToQueryString(props), { headers }, options),
    getSlotCollections: async (props, headers, options) => this.request('/slot/collections' + propsToQueryString(props), { headers }, options),
    getSlotCollectionIds: async (props, headers, options) => this.request('/slot/collections' + propsToQueryString({ ...props, idOnly: true }), { headers }, options),

    getExpressionTypes: async () => this.request('/slot/expressions/types'),
    getSlotExpressions: async (props, headers, options) => this.request('/slot/expressions' + propsToQueryString(props), { headers }, options),
    createExpression: async (props, headers, options) => this.request('/slot/expressions/new', { method: 'POST', body: JSON.stringify(props), headers }, options),
    updateExpression: async (props, headers, options) => this.request('/slot/expressions/update', { method: 'PUT', body: JSON.stringify(props), headers }, options),
  };

  safe: SafeSlotsHandlers = {
    getSlot: async (props, headers, options) => {
      try { return { result: await this.getSlot(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    collections: async (props, headers, options) => {
      try { return { result: await this.collections(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getSlotCollections: async (props, headers, options) => {
      try { return { result: await this.getSlotCollections(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getSlotCollectionIds: async (props, headers, options) => {
      try { return { result: await this.getSlotCollectionIds(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },

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
  };
}