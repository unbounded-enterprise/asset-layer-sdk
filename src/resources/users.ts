import { Base } from './base';
import { RawUsersHandlers, RegisterDidProps, SafeUsersHandlers, User } from '../types/user';
import { parseBasicError } from 'src/utils/basic-error';

export class Users extends Base {
  getUser = async (headers?: HeadersInit) => { return (await this.raw.getUser(headers)).body.user; }
  getOTP = async (headers?: HeadersInit) => { return (await this.raw.getOTP(headers)).body.otp; }
  registerDid = async (headers?: HeadersInit) => { return (await this.raw.registerDid(headers)).body; }

  raw: RawUsersHandlers = {
    getUser: async (headers) => this.request('/user/info', { headers }),
    getOTP: async (headers) => this.request('/user/register', { headers }),
    registerDid: async (headers) => this.request('/user/register', { headers }),
  };

  safe: SafeUsersHandlers = {
    getUser: async (headers) => {
      try { return { result: await this.getUser(headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getOTP: async (headers) => {
      try { return { result: await this.getOTP(headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    registerDid: async (headers) => {
      try { return { result: await this.registerDid(headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}