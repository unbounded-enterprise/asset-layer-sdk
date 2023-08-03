import { Base } from './base';
import { RawUsersHandlers, SafeUsersHandlers, User } from '../types/user';
import { parseBasicError } from 'src/utils/basic-error';

export class Users extends Base {
  getUser = async () => { return (await this.raw.getUser()).body.user; }

  raw: RawUsersHandlers = {
    getUser: () => this.request('/user/info'),
  };

  safe: SafeUsersHandlers = {
    getUser: async () => {
      try { return { result: await this.getUser() }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}