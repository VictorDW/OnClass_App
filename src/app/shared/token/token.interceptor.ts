import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, delay, of, throwError } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { AlertService } from '../service/observables/alert.service';
import { Router } from '@angular/router';
import { MESSAGES_ALERT } from '../constants/constants';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService, private _alert: AlertService, private _router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this._authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {

        if(error.status === 401) {
          this.determineMessageError(error);
        }
        
        return throwError(() => error);
      })
    );
  }


  determineMessageError(error: any) {

    if (this._authService.isDateExpired()) {
        this._alert.showAlert(MESSAGES_ALERT.TOKEN_EXPIRED, 'error', 4000);
        this.waitingTime();
    } else {
        this._alert.showAlert(error.error.message, 'error', 4000);
    }
  }

  waitingTime() {
    of(null).pipe(
      delay(5000)
    ).subscribe(() => {
      this._router.navigate(['/login']);
    });
  }
}
