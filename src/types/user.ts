import type { BasicError, BasicResponse, BasicResult } from "./basic-types";

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
    register: (props?: RegisterUserProps, headers?: HeadersInit) => Promise<BasicResponse<GetOTPResponseBody|RegisterUserResponseBody>>;
    getOTP: (headers?: HeadersInit) => Promise<BasicResponse<GetOTPResponseBody>>;
    registerDid: (props: RegisterDidProps, headers?: HeadersInit) => Promise<BasicResponse<RegisterUserResponseBody>>;
};

export type SafeUsersHandlers = {
    getUser: (headers?: HeadersInit) => Promise<BasicResult<User>>;
    register: (props?: RegisterUserProps, headers?: HeadersInit) => Promise<BasicResult<string|RegisterUserResponseBody>>;
    getOTP: (headers?: HeadersInit) => Promise<BasicResult<string>>;
    registerDid: (props: RegisterDidProps, headers?: HeadersInit) => Promise<BasicResult<RegisterUserResponseBody>>;
};

export type SafeLoginHandlers = {
    initialize: (setter?: (initialized: boolean) => void) => Promise<BasicResult<boolean|void>>;
    isUserLoggedIn: () => Promise<BasicResult<boolean|undefined>>;
    getUserDidToken: () => Promise<BasicResult<string|undefined>>;
    getUserMetadata: () => Promise<BasicResult<any>>;
    loginUser: (props: UserLoginProps) => Promise<BasicResult<boolean|void>>;
    logoutUser: () => Promise<BasicResult<void>>;
    // newRegisteredDidToken: () => Promise<BasicResult<string|undefined>>;
};