import { BasicResponse, BasicResult, BasicSuccessResponse } from "./basic-types";

export type UserStatus = string;
export type UserTeamRole = 'admin' | 'developer';
export type UserRole = { teamId: string; role: UserTeamRole; };
export type UserAlias = { userId: string; handle: string; };
export type User = {
    userId: string;
    name: string;
    email: string;
    status: UserStatus;
    handle: string;
    roles: UserRole[];
    createdAt: number;
    updatedAt: number;
};
export type UserRegisteredBody = {
    _id: string;
    email: string;
    handle: string;
}

export type UserLoginProps = { email?: string; showUI?: boolean; };
export type RegisterDidProps = { did: string };

export type RawUsersHandlers = {
    getUser: (headers?: HeadersInit) => Promise<BasicResponse<{ user: User; }>>;
    getOTP: (headers?: HeadersInit) => Promise<BasicResponse<{ otp: string; }>>;
    registerDid: (headers?: HeadersInit) => Promise<BasicResponse<UserRegisteredBody>>;
};

export type SafeUsersHandlers = {
    getUser: (headers?: HeadersInit) => Promise<BasicResult<User>>;
    getOTP: (headers?: HeadersInit) => Promise<BasicResult<string>>;
    registerDid: (headers?: HeadersInit) => Promise<BasicResult<UserRegisteredBody>>;
};