import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGateway } from 'src/app/domain/gateway/auth-gateway';
import { Auth, AuthResponse } from 'src/app/domain/models/auth';
import { environment, Endpoints } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements AuthGateway {

  private _url = environment.BASE_URL_USER + Endpoints.AUTH + Endpoints.LOGIN;

  constructor(private _httpClient: HttpClient) { }
  
  login(auth: Auth): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>(this._url, auth);
  }
}
