import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/enviroment";
import { catchError, map, Observable, of } from "rxjs";
import {SignUp} from "../interfaces/signup.interface";
import { Tokens } from "../interfaces/token.interface";
import { Login } from "../interfaces/login.interface";

@Injectable({
    providedIn: 'root',
})
export class AuthDataSource {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.apiUrl;
    }

    signUp(signUpData: SignUp): Observable<boolean> {
        return this.http.post<Tokens>(`${this.baseUrl}/api/auth/register`, signUpData).pipe(
            map((response) => {
              if (response.access_token && response.refresh_token) {
                localStorage.setItem('accessToken', response.access_token);
                localStorage.setItem('refreshToken', response.refresh_token);
                return true; 
              } else {
                return false; 
              }
            }),
            catchError(() => of(false)), 
        );
    }

    login(loginData: Login): Observable<boolean>{
        return this.http.post<Tokens>(`${this.baseUrl}/api/auth/login`, loginData).pipe(
            map((response) => {
              if (response.access_token && response.refresh_token) {
                localStorage.setItem('accessToken', response.access_token);
                localStorage.setItem('refreshToken', response.refresh_token);
                return true; 
              } else {
                return false; 
              }
            }),
            catchError(() => of(false)), 
        );
    }

    logout() {

      return this.http.post(`${this.baseUrl}/api/auth/logout`, {}).subscribe({
        next: () => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        },
        error: (err) => {
          console.error('Error al cerrar sesión:', err);
        },
      });
    }


}