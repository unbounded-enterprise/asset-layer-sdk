import { BasicResponse, BasicResult } from "./basic-types";
import { Collection } from "./collection";

export type Slot = {
    collections: string[];
};

export type SlotWithCollections = Omit<Slot, 'collections'> & {
    collections: Collection[];
}

export type GetSlotProps = { slotId: string; }

export type GetSlotCollectionsProps = { 
    slotId: string; 
    idOnly?: boolean; 
    includeDeactivated?: boolean; 
}

export type GetSlotResponse = BasicResponse<{ slot: Slot; }>;
export type GetSlotCollectionsResponse = BasicResponse<{ slot: SlotWithCollections; }>;
export type GetSlotCollectionsIdsResponse = BasicResponse<{ slot: Slot; }>;

export type RawSlotsHandlers = {
    getSlot: (props: GetSlotProps) => Promise<GetSlotResponse>;
    getSlotCollections: (props: GetSlotCollectionsProps) => Promise<GetSlotCollectionsResponse|GetSlotCollectionsIdsResponse>;
};

export type SafeSlotsHandlers = {
    getSlot: (props: GetSlotProps) => Promise<BasicResult<Slot>>;
    getSlotCollections: (props: GetSlotCollectionsProps) => Promise<BasicResult<Collection[]|string[]>>;
};