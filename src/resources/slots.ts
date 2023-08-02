import { Base } from './base';
import { GetSlotCollectionsProps, GetSlotProps, RawSlotsHandlers, SafeSlotsHandlers, Slot } from '../types/slot';
import { propsToQueryString } from 'src/utils/basic-format';
import { parseBasicError } from 'src/utils/basic-error';

export class Slots extends Base {
  getSlot = async (props: GetSlotProps) => ((await this.raw.getSlot(props)).body.slot);
  getSlotCollections = async (props: GetSlotCollectionsProps) => ((await this.raw.getSlotCollections(props)).body.slot.collections);

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
    getSlot: async (props) => this.request('/slot/info' + propsToQueryString(props)),
    getSlotCollections: async (props) => this.request('/slot/collections' + propsToQueryString(props)),
  };

  safe: SafeSlotsHandlers = {
    getSlot: async (props) => {
      try { return { result: await this.getSlot(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getSlotCollections: async (props) => {
      try { return { result: await this.getSlotCollections(props) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}