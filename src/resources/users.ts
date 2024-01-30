import type { GetOTPResponseBody, GetUserCollectionsProps, RawUsersHandlers, RegisterDidProps, RegisterUserProps, RegisterUserResponseBody, SafeUsersHandlers, UserCollectionsProps } from '../types/user';
import { Base } from './base';
import { parseBasicError } from '../utils/basic-error';
import { propsToQueryString } from '../utils/basic-format';

export class Users extends Base {
  getUser = async (headers?: HeadersInit) => { return (await this.raw.getUser(headers)).body.user; }
  collections = async (props: UserCollectionsProps, headers?: HeadersInit) => ((await this.raw.collections(props, headers)).body.collections);
  getUserCollections = async (props: GetUserCollectionsProps, headers?: HeadersInit) => ((await this.raw.getUserCollections(props, headers)).body.collections);
  getUserCollectionIds = async (props: GetUserCollectionsProps, headers?: HeadersInit) => ((await this.raw.getUserCollectionIds(props, headers)).body.collections);
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
    collections: async (props, headers) => this.request('/user/collections' + propsToQueryString(props), { headers }),
    getUserCollections: async (props, headers) => this.request('/user/collections' + propsToQueryString(props), { headers }),
    getUserCollectionIds: async (props, headers) => this.request('/user/collections' + propsToQueryString({ ...props, idOnly: true }), { headers }),
    register: async (props, headers) => this.request('/user/register', { method: 'POST', body: JSON.stringify(props), headers }),
    getOTP: async (headers) => this.request('/user/register', { method: 'POST', headers }),
    registerDid: async (props, headers) => this.request('/user/register', { method: 'POST', body: JSON.stringify(props), headers }),
  };

  safe: SafeUsersHandlers = {
    getUser: async (headers) => {
      try { return { result: await this.getUser(headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    collections: async (props, headers) => {
      try { return { result: await this.collections(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserCollections: async (props, headers) => {
      try { return { result: await this.getUserCollections(props, headers) }; }
      catch (e) { return { error: parseBasicError(e) }; } },
    getUserCollectionIds: async (props, headers) => {
      try { return { result: await this.getUserCollectionIds(props, headers) }; }
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