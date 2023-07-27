import { Base } from './base';
import { Collection } from '../types/collection';
import { Slot, SlotUpdate } from '../types/slot';

export class Slots extends Base {
  getSlot(id: string): Promise<Slot> {
    return this.request(`/slot/info?slotId=${id}`);
  }
  /* does not exist
  getSlots(ids: string[]): Promise<Slot[]> {
    return this.request(`/slot/info?slotIds=${ids}`);
  }
  */
  getSlotCollections(id: string, idOnly: boolean = false, includeDeactivated: boolean = false): Promise<Collection[]> {
    return this.request(`/slot/collections?slotId=${id}&idOnly=${idOnly}&includeDeactivated=${includeDeactivated}`);
  }
  /* exists, not in scope
  updateSlot(update: SlotUpdate): Promise<boolean> {
    return this.request('/slot/update', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
  */
}