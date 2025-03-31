import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot, RouterStateSnapshot,
    Router
} from "@angular/router";
import { AuthService } from "../services/auth.service";


@Injectable()
export class AuthGuard {

    constructor(private router: Router,
        private auth: AuthService) { }
        
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (!this.auth.authenticated) {

            this.router.navigateByUrl("/");
            return false;
        }

        if(this.auth.isTokenExpired()){
            this.auth.clear();
            window.location.reload();
            return false;
        }

        return true;
    }
}