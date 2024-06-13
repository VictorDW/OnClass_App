import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MESSAGES_ALERT, ResponseErrorMesages } from '../../constants/constants';
import { AlertService } from '../observables/alert.service';


@Injectable({
  providedIn: 'root'
})

export class HandlerErrorService {

  constructor(private _alertService: AlertService) {}

  handler(error: HttpErrorResponse) {

    if (error.status !== 401) {

      const message = error.statusText === "Unknown Error" || error.status === 500?
      MESSAGES_ALERT.DEFAULT :
      error.error.message

      this.throwAlert(message);
    }
  }

  throwAlert(error: string) {
    this._alertService.showAlert(error);
  }

}
