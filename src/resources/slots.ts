import type { GetSlotCollectionsAllProps, GetSlotCollectionsProps, GetSlotProps, RawSlotsHandlers, SafeSlotsHandlers } from '../types/slot';
import type { CreateExpressionProps, GetSlotExpressionsProps, UpdateExpressionProps } from 'src/types/expression';
import { Base } from './base';
import { propsToQueryString } from '../utils/basic-format';
import { parseBasicError } from '../utils/basic-error';

export class Slots extends Base {
  getSlot = async (props: GetSlotProps, headers?: HeadersInit) => ((await this.raw.getSlot(props, headers)).body.slot);
  collections = async (props: GetSlotCollectionsAllProps, headers?: HeadersInit) => ((await this.raw.collections(props, headers)).body.slot.collections);
  getSlotCollections = async (props: GetSlotCollectionsProps, headers?: HeadersInit) => ((await this.raw.getSlotCollections(props, headers)).body.slot.collections);
  getSlotCollectionIds = async (props: GetSlotCollectionsProps, headers?: HeadersInit) => ((await this.raw.getSlotCollectionIds(props, headers)).body.slot.collections);

  getExpressionTypes = async () => { return (await this.raw.getExpressionTypes()).body.expressionTypes; }
  getSlotExpressions = async (props: GetSlotExpressionsProps, headers?: HeadersInit) => { return (await this.raw.getSlotExpressions(props, headers)).body.expressions; }
  createExpression = async (props: CreateExpressionProps, headers?: HeadersInit) => { return (await this.raw.createExpression(props, headers)).body.expressionId; }
  updateExpression = async (props: UpdateExpressionProps, headers?: HeadersInit) => { return (await this.raw.updateExpression(props, headers)).success; }

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
    getSlot: async (props, headers) => this.request('/slot/info' + propsToQueryString(props), { headers }),
    collections: async (props, headers) => this.request('/slot/collections' + propsToQueryString(props), { headers }),
    getSlotCollections: async (props, headers) => this.request('/slot/collections' + propsToQueryString(props), { headers }),
    getSlotCollectionIds: async (props, headers) => this.request('/slot/collections' + propsToQueryString({ ...props, idOnly: true }), { headers }),

    getExpressionTypes: async () => this.request('/slot/expressions/types'),
    getSlotExpressions: async (props, headers) => this.request('/slot/expressions' + propsToQueryString(props), { headers }),
    createExpression: async (props, headers) => this.request('/slot/expressions/new', { method: 'POST', body: JSON.stringify(props), headers }),
    updateExpression: async (props, headers) => this.request('/slot/expressions/update', { method: 'PUT', body: JSON.stringify(props), headers }),
  };

  safe: SafeSlotsHandlers = {
    getSlot: async (props, headers) => {
      try { return { result: await this.getSlot(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    collections: async (props, headers) => {
      try { return { result: await this.collections(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getSlotCollections: async (props, headers) => {
      try { return { result: await this.getSlotCollections(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getSlotCollectionIds: async (props, headers) => {
      try { return { result: await this.getSlotCollectionIds(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },

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
  };
}