import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Auth, AuthResponse } from '../../models/auth';
import { AuthGateway } from '../../gateway/auth-gateway';

@Injectable({
  providedIn: 'root'
})
export class AuthUseCaseService{

  constructor(private _authAdapter: AuthGateway) { }


  login(model: Auth): Observable<AuthResponse> {

    return this._authAdapter.login(model).pipe(
      map((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('fullName', `${data.firstName} ${data.lastName}`);
        return data;
      })
    )
  }


}
