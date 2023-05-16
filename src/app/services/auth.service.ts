import { Injectable } from '@angular/core';
import { Admin } from '../models/admin';

@Injectable()
export class AuthService {
  loggedIn: boolean = false;

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  IsAuthenticated() {
    return this.loggedIn;
  }
}
