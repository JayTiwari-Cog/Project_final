import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { AuthProvider } from "../services/auth.provider";

import { Observable,throwError } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class UserService{
    private registerUrl='http://localhost:3000/api/register'
    private loginUrl='http://localhost:3000/api/login'
    constructor(private http:HttpClient, private authProvider: AuthProvider){}
     registerUser(userData:any):Observable<any>{
        console.log("Registering user",userData);
        return this.http.post<any>(this.registerUrl,userData);
     }

      setToken(token: string) {
        console.log('Setting auth token:', token);
        this.authProvider.setToken(token);
    }

    getToken(): string | null {
      return this.authProvider.getToken();
    }

     loginUser(loginData:any):Observable<any>{
       
        console.log("Logging in user",loginData);
        return this.http.post<any>(this.loginUrl,loginData);
     }
     verifyToken(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token found'));
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>('http://localhost:3000/api/verify', { headers });
  }

  setRole(role: string) {
    localStorage.setItem('userRole', role);
  }
} 
