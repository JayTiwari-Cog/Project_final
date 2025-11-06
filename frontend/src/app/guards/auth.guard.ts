import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../apiService/userService';
import { AuthProvider } from '../services/auth.provider';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private authProvider: AuthProvider, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    const token = this.authProvider.getToken();
    if (!token) {
      console.log('AuthGuard: No token found, redirecting to login');
      return of(this.router.createUrlTree(['/guest-login']));
    }

    console.log('AuthGuard: Token found, verifying with backend');
    // Verify token with backend
    return this.userService.verifyToken().pipe(
      map(res => {
        // if verify returned success, allow; else clear token and redirect
        if (res && res.success) {
          console.log('AuthGuard: Token verified successfully');
          return true;
        }
        console.log('AuthGuard: Token verification failed, clearing and redirecting');
        this.authProvider.clearToken(); // Clear invalid token
        return this.router.createUrlTree(['/guest-login']);
      }),
      catchError(err => {
        console.log('AuthGuard: Token verification error, clearing and redirecting', err);
        this.authProvider.clearToken(); // Clear invalid token
        return of(this.router.createUrlTree(['/guest-login']));
      })
    );
  }
}
