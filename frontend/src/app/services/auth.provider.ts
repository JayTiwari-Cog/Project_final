import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthProvider {
  // in-memory token storage + sessionStorage for refresh persistence
  private _token: string | null = null;
  // observable auth state useful for components
  public token$ = new BehaviorSubject<string | null>(null);

  constructor() {
    // On initialization, check if token exists in sessionStorage (survives page refresh)
    this.loadTokenFromSession();
  }

  private loadTokenFromSession() {
    const sessionToken = sessionStorage.getItem('authToken');
    
    if (sessionToken) {
      console.log('AuthProvider: Loading token from sessionStorage');
      this._token = sessionToken;
      this.token$.next(sessionToken);
    }
  }

  setToken(token: string) {
    console.log(token);
    this._token = token;
    sessionStorage.setItem('authToken', token);
    this.token$.next(token);
  }

  getToken(): string | null {
    console.log('AuthProvider: Getting token from memory');
    return this._token;
  }

  clearToken() {
    console.log('AuthProvider: Clearing token from memory and sessionStorage');
    this._token = null;
    sessionStorage.removeItem('authToken');
    this.token$.next(null);
  }
}
