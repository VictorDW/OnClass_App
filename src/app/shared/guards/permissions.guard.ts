import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { AlertService } from '../service/observables/alert.service';
import { MESSAGES_ALERT } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {


  constructor(private _authService: AuthService, private _router: Router, private _alert: AlertService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const rolesExpected = route.data['rolesExpected'];

      if(!this._authService.isAuthenticated()) {
        this._router.navigate(['/login']);
        return false;
      }

      if(!this._authService.hasRole(rolesExpected)) {
        this._alert.showAlert(MESSAGES_ALERT.ERROR);
        this._router.navigate(['/dashboard/home']);
        return false;
      }

      return true;
  }

}
