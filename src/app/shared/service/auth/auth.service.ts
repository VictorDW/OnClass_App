import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getFullname(): string | null {
    return localStorage.getItem('fullName') || null;
  }

  private getExpirationDate(): number | null | undefined {
    const token = this.getToken();
    return token ? jwtDecode(token).exp : null;
  }

  isDateExpired(): boolean {
    const expirationDate = this.getExpirationDate();
    return expirationDate ? expirationDate < (Date.now() / 1000) : false;
  }

  private getDecodedToken(): any {

    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  public getUserRole(): string | null {

    const payload = this.getDecodedToken();
    return payload ? payload.role : null;
  }

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  public hasRole(role: string[]): boolean {

    if(role.length === 0) {
      return false;
    }

    const userRole = this.getUserRole();
    return userRole ? role.includes(userRole) : false;
  }


}
