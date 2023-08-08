import { Base } from './base';
import { GetOTPResponseBody, RawUsersHandlers, RegisterDidProps, RegisterUserProps, RegisterUserResponseBody, SafeUsersHandlers, User } from '../types/user';
import { parseBasicError } from 'src/utils/basic-error';

export class Users extends Base {
  getUser = async (headers?: HeadersInit) => { return (await this.raw.getUser(headers)).body.user; }
  register = async (props?: RegisterUserProps, headers?: HeadersInit) => { 
    const response = (await this.raw.register(props, headers));
    return (props?.otp) ? 
      (response.body as GetOTPResponseBody).otp
      : (response.body as RegisterUserResponseBody);
  }
  getOTP = async (headers?: HeadersInit) => { return (await this.raw.getOTP(headers)).body.otp; }
  registerDid = async (props: RegisterDidProps, headers?: HeadersInit) => { return (await this.raw.registerDid(props, headers)).body; }

  raw: RawUsersHandlers = {
    getUser: async (headers) => this.request('/user/info', { headers }),
    register: async (props, headers) => this.request('/user/register', { method: 'POST', body: JSON.stringify(props), headers }),
    getOTP: async (headers) => this.request('/user/register', { method: 'POST', headers }),
    registerDid: async (props, headers) => this.request('/user/register', { method: 'POST', body: JSON.stringify(props), headers }),
  };

  safe: SafeUsersHandlers = {
    getUser: async (headers) => {
      try { return { result: await this.getUser(headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    register: async (props, headers) => {
      try { return { result: await this.register(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getOTP: async (headers) => {
      try { return { result: await this.getOTP(headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    registerDid: async (props, headers) => {
      try { return { result: await this.registerDid(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}