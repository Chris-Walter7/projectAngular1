import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";



@Injectable({
  providedIn: 'root'
})
export class AuthService {
private usersStorage: IUser[] = [];
  constructor() { }

  checkUser(user: IUser): boolean {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);
    if (isUserExists) {
      return isUserExists.psw === user.psw;
    }
    return false;
  }
  setUser(user: IUser): void {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);
    if (!isUserExists && user?.login) {
      this.usersStorage.push(user);
    }
  }
  setUserToLocalStorage(): void {
    const user: IUser = this.usersStorage[this.usersStorage.length -1];
    localStorage.setItem('new user', JSON.stringify(user))
  };
}

