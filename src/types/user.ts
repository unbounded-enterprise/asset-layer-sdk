import type { BasicError, BasicResponse, BasicResult } from "./basic-types";
import { Collection } from "./collection";

export type UserStatus = string;
export type UserTeamRole = 'admin' | 'developer';
export type UserRole = { teamId: string; role: UserTeamRole; };
export type UserAlias = { userId: string; handle: string; handcashHandle?: string; };
export type User = {
    userId: string;
    email: string;
    handle: string;
    roles: UserRole[];
    createdAt: number;
    updatedAt: number;
    name?: string;
    status?: UserStatus;
    handcashHandle?: string;
};
export type GetUserCollectionsProps = { includeDrafts?: boolean; includeSubmissionData?: boolean; };
export type UserCollectionsProps = GetUserCollectionsProps & { idOnly?: boolean; };
export type GetOTPResponseBody = { otp: string; };
export type RegisterUserResponseBody = {
    _id: string;
    email: string;
    handle: string;
}

export type UserLoginProps = { 
    email?: string; 
    didToken?: string; 
    registeredDidToken?: string; 
    showUI?: boolean; 
    onSuccess?: () => void; 
    onError?: (message:string) => void; 
    onComplete?: (loggedIn:boolean) => void;
};
export type RegisterUserProps = { otp?: string };
export type RegisterDidProps = { otp: string };

export type RawUsersHandlers = {
    getUser: (headers?: HeadersInit) => Promise<BasicResponse<{ user: User; }>>;
    collections: (props: UserCollectionsProps, headers?: HeadersInit) => Promise<BasicResponse<{ collections: Collection[]; }>>;
    getUserCollections: (props: GetUserCollectionsProps, headers?: HeadersInit) => Promise<BasicResponse<{ collections: Collection[]; }>>;
    getUserCollectionIds: (props: GetUserCollectionsProps, headers?: HeadersInit) => Promise<BasicResponse<{ collections: string[]; }>>;
    register: (props?: RegisterUserProps, headers?: HeadersInit) => Promise<BasicResponse<GetOTPResponseBody|RegisterUserResponseBody>>;
    getOTP: (headers?: HeadersInit) => Promise<BasicResponse<GetOTPResponseBody>>;
    registerDid: (props: RegisterDidProps, headers?: HeadersInit) => Promise<BasicResponse<RegisterUserResponseBody>>;
};

export type SafeUsersHandlers = {
    getUser: (headers?: HeadersInit) => Promise<BasicResult<User>>;
    collections: (props: UserCollectionsProps, headers?: HeadersInit) => Promise<BasicResult<Collection[]|string[]>>;
    getUserCollections: (props: GetUserCollectionsProps, headers?: HeadersInit) => Promise<BasicResult<Collection[]>>;
    getUserCollectionIds: (props: GetUserCollectionsProps, headers?: HeadersInit) => Promise<BasicResult<string[]>>;
    register: (props?: RegisterUserProps, headers?: HeadersInit) => Promise<BasicResult<string|RegisterUserResponseBody>>;
    getOTP: (headers?: HeadersInit) => Promise<BasicResult<string>>;
    registerDid: (props: RegisterDidProps, headers?: HeadersInit) => Promise<BasicResult<RegisterUserResponseBody>>;
};

export type SafeLoginHandlers = {
    initialize: (setter?: (loggedIn: boolean) => void) => Promise<BasicResult<boolean|void>>;
    isUserLoggedIn: () => Promise<BasicResult<boolean|undefined>>;
    getUserDidToken: () => Promise<BasicResult<string|undefined>>;
    getUserMetadata: () => Promise<BasicResult<any>>;
    loginUser: (props: UserLoginProps) => Promise<BasicResult<boolean|void>>;
    logoutUser: () => Promise<BasicResult<void>>;
    // newRegisteredDidToken: () => Promise<BasicResult<string|undefined>>;
};