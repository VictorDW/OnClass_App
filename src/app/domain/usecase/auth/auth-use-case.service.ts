import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Auth, AuthResponse } from '../../models/auth';
import { AuthGateway } from '../../gateway/auth-gateway';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthUseCaseService{

  constructor(private _authAdapter: AuthGateway,
              private _authService: AuthService,
              private _router: Router) { }


  login(model: Auth): Observable<AuthResponse> {

    return this._authAdapter.login(model).pipe(
      map((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('fullName', `${data.firstName} ${data.lastName}`);
        return data;
      })
    )
  }

  logout(): void {
   this._authService.cleanLocalStorage();
   this._router.navigate(['/login']);
  }


}
