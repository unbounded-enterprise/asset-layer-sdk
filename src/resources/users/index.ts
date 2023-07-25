import { Base } from '../base';
import { User } from './types';

export class Users extends Base {
  getUser(id: string): Promise<User> {
    return this.request(`/user/info?userId=${id}`);
  }
}