import { Base } from './base';
import { RawUsersHandlers, SafeUsersHandlers, User } from '../types/user';
import { parseBasicError } from 'src/utils/basic-error';

export class Users extends Base {
  getUser = async (headers?: HeadersInit) => { return (await this.raw.getUser(headers)).body.user; }

  raw: RawUsersHandlers = {
    getUser: async (headers) => this.request('/user/info', { headers }),
  };

  safe: SafeUsersHandlers = {
    getUser: async (headers) => {
      try { return { result: await this.getUser(headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}