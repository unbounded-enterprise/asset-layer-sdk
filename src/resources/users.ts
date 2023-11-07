import type { GetOTPResponseBody, RawUsersHandlers, RegisterDidProps, RegisterUserProps, RegisterUserResponseBody, SafeUsersHandlers } from '../types/user';
import { AssetLayerRequestOptions, Base } from './base';
import { parseBasicError } from '../utils/basic-error';

export class Users extends Base {
  getUser = async (headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.getUser(headers, options)).body.user; }
  register = async (props?: RegisterUserProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { 
    const response = (await this.raw.register(props, headers, options));
    return (props?.otp) ? 
      (response.body as GetOTPResponseBody).otp
      : (response.body as RegisterUserResponseBody);
  }
  getOTP = async (headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.getOTP(headers, options)).body.otp; }
  registerDid = async (props: RegisterDidProps, headers?: HeadersInit, options?: AssetLayerRequestOptions) => { return (await this.raw.registerDid(props, headers, options)).body; }

  raw: RawUsersHandlers = {
    getUser: async (headers, options) => this.request('/user/info', { headers }, options),
    register: async (props, headers, options) => this.request('/user/register', { method: 'POST', body: JSON.stringify(props), headers }, options),
    getOTP: async (headers, options) => this.request('/user/register', { method: 'POST', headers }, options),
    registerDid: async (props, headers, options) => this.request('/user/register', { method: 'POST', body: JSON.stringify(props), headers }, options),
  };

  safe: SafeUsersHandlers = {
    getUser: async (headers, options) => {
      try { return { result: await this.getUser(headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    register: async (props, headers, options) => {
      try { return { result: await this.register(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getOTP: async (headers, options) => {
      try { return { result: await this.getOTP(headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    registerDid: async (props, headers, options) => {
      try { return { result: await this.registerDid(props, headers, options) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
  };
}