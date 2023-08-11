import { BasicResponse, BasicResult } from "./basic-types";
import { Collection } from "./collection";

export type Slot = {
    slotId: string;
    slotName: string;
    slotImage: string;
    description: string;
    appId: string;
    acceptingCollections: boolean;
    isPublic: boolean;
    collectionTypes: string;
    createdAt: number;
    updatedAt: number;
    collections: string[];
    expressions: string[];
};

export type SlotWithCollections = Omit<Slot, 'collections'> & {
    collections: Collection[];
}

export type GetSlotProps = { slotId: string; }

export type GetSlotCollectionsProps = { slotId: string; includeDeactivated?: boolean; };
export type GetSlotCollectionsAllProps = GetSlotCollectionsProps & { idOnly?: boolean; };

export type GetSlotResponse = BasicResponse<{ slot: Slot; }>;
export type GetSlotCollectionsResponse = BasicResponse<{ slot: SlotWithCollections; }>;
export type GetSlotCollectionsIdsResponse = BasicResponse<{ slot: Slot; }>;

export type RawSlotsHandlers = {
    getSlot: (props: GetSlotProps, headers?: HeadersInit) => Promise<GetSlotResponse>;
    collections: (props: GetSlotCollectionsAllProps, headers?: HeadersInit) => Promise<GetSlotCollectionsResponse|GetSlotCollectionsIdsResponse>;
    getSlotCollections: (props: GetSlotCollectionsProps, headers?: HeadersInit) => Promise<GetSlotCollectionsResponse>;
    getSlotCollectionIds: (props: GetSlotCollectionsProps, headers?: HeadersInit) => Promise<GetSlotCollectionsIdsResponse>;
};

export type SafeSlotsHandlers = {
    getSlot: (props: GetSlotProps, headers?: HeadersInit) => Promise<BasicResult<Slot>>;
    collections: (props: GetSlotCollectionsAllProps, headers?: HeadersInit) => Promise<BasicResult<Collection[]|string[]>>;
    getSlotCollections: (props: GetSlotCollectionsProps, headers?: HeadersInit) => Promise<BasicResult<Collection[]>>;
    getSlotCollectionIds: (props: GetSlotCollectionsProps, headers?: HeadersInit) => Promise<BasicResult<string[]>>;
};