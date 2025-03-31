import { Injectable } from '@angular/core';
import { AuthDataSource } from '../model/auth.datasource';
import { Login } from '../interfaces/login.interface';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { UserRoleEnum } from '../utils/enums';
import { SignUp } from '../interfaces/signup.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    constructor(private authDataSource: AuthDataSource) { }

    authenticate(loginData: Login): Observable<boolean> {
        return this.authDataSource.login(loginData);
    }

    register(signUpData: SignUp){
        return this.authDataSource.signUp(signUpData);
    }

    get authenticated(): boolean {;
        return localStorage.getItem('accessToken') != null;
    }

    isTokenExpired(): boolean {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          return true; 
        }
      
        try {
          const decodedToken: JwtPayload & { exp?: number } = jwtDecode(token); 
          const currentTime = Date.now() / 1000; 
          return decodedToken.exp ? (decodedToken.exp<currentTime) : true;
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          return true; 
        }
      }

    get userRole(): string {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            return UserRoleEnum.None;
        }

        try {
            const decodedToken: JwtPayload & { role?: string } = jwtDecode(token);
            return decodedToken.role ? decodedToken.role : 'USER';
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            return UserRoleEnum.None;
        }
    }

    clear() {
        this.authDataSource.logout();
        localStorage.clear();
    }



}