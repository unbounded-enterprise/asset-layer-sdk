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
export type GetOTPResponseBody = { otp: string; };
export type RegisterUserResponseBody = {
    _id: string;
    email: string;
    handle: string;
}

export type UserLoginProps = { email?: string; showUI?: boolean; };
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