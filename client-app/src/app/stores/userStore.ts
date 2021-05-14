import { UserFormValues } from './../models/user';
import { makeAutoObservable } from 'mobx';
import { User } from '../models/user';
import agent from '../api/agent';

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return this.user != null;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      console.log(user);
    } catch (error) {
      throw error;
    }
  };
}
