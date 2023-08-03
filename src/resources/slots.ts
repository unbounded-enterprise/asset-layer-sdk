import { Base } from './base';
import { GetSlotCollectionsProps, GetSlotProps, RawSlotsHandlers, SafeSlotsHandlers, Slot } from '../types/slot';
import { propsToQueryString } from 'src/utils/basic-format';
import { parseBasicError } from 'src/utils/basic-error';

export class Slots extends Base {
  getSlot = async (props: GetSlotProps, headers?: HeadersInit) => ((await this.raw.getSlot(props, headers)).body.slot);
  getSlotCollections = async (props: GetSlotCollectionsProps, headers?: HeadersInit) => ((await this.raw.getSlotCollections(props, headers)).body.slot.collections);

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
    getSlotCollections: async (props, headers) => this.request('/slot/collections' + propsToQueryString(props), { headers }),
  };

  safe: SafeSlotsHandlers = {
    getSlot: async (props, headers) => {
      try { return { result: await this.getSlot(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getSlotCollections: async (props, headers) => {
      try { return { result: await this.getSlotCollections(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}