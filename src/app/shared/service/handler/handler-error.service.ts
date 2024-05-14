import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseErrorMesages } from '../../constants/constants';


@Injectable({
  providedIn: 'root'
})

export class HandlerErrorService {

  handler(error: HttpErrorResponse) {

    return ResponseErrorMesages[error.status] || 'Ha ocurrido un error inesperado';
  }
}
