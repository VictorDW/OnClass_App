import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJWaWN0b3IiLCJyb2xlIjoiQURNSU4iLCJzdWIiOiJ2aWFjdHVyMTFAZ21haWwuY29tIiwiaWF0IjoxNzE1ODA1NzAxLCJleHAiOjE3MTg0MzU1MDF9.hv7Ithd9b060rlZfCltGkVW1_jTBUab0-TFod-T9WqY';

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
