import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot, RouterStateSnapshot,
    Router
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UserRoleEnum } from "../utils/enums";

@Injectable()
export class AdminGuard{
    constructor(private router: Router,
        private auth: AuthService) { }

        canActivate(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): boolean {

                if (!(this.auth.userRole == UserRoleEnum.Admin)) {
                    this.router.navigateByUrl("/");
                    return false;
                }
                return true;
        }
}