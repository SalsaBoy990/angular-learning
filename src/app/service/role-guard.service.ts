import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    if (!this.auth.currentUserValue || this.auth.currentUserValue.role < expectedRole) {
      this.router.navigate(['forbidden']);
      return false;
    }

    return true;

  }
}
