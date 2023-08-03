import { BasicResponse, BasicResult } from "./basic-types";

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

export type UserLoginProps = { didToken: string; };

export type RawUsersHandlers = {
    getUser: (headers?: HeadersInit) => Promise<BasicResponse<{ user: User; }>>;
};

export type SafeUsersHandlers = {
    getUser: (headers?: HeadersInit) => Promise<BasicResult<User>>;
};