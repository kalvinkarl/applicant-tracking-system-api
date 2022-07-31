import { Injectable } from '@angular/core';
const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  signOut(): void {
    window.localStorage.clear();
  }
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): any {
    return localStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    return JSON.parse(localStorage.getItem(USER_KEY)+'');
  }
}
