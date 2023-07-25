import { Base } from '../base';
import { Slot, SlotUpdate } from './types';

export class Slots extends Base {
  // /new
  getSlot(id: string): Promise<Slot> {
    return this.request(`/slot/info?slotId=${id}`);
  }
  /*
  getSlots(ids: string[]): Promise<Slot[]> {
    return this.request(`/slot/info?slotIds=${ids}`);
  }
  */
  updateSlot(update: SlotUpdate): Promise<boolean> {
    return this.request('/slot/update', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
  // /add
  // /collections
  // /new
  // /remove
}