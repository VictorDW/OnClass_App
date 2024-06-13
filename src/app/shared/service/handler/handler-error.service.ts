import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseErrorMesages } from '../../constants/constants';


@Injectable({
  providedIn: 'root'
})

export class HandlerErrorService {

  handler(error: HttpErrorResponse) {
    
   return error.statusText === "Unknown Error" || error.status === 500? 
      'Ha ocurrido un error inesperado' : 
      error.error.message
  }
}
