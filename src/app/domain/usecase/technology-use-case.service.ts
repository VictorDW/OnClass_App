import { Injectable } from '@angular/core';
import {Observable, catchError, throwError} from "rxjs";
import {Technology} from "../models/technology";
import {TechnologyGateway} from "../gateway/technology-gateway";
import { ServiceForm } from "../interface/api-service";
import { HandlerErrorService } from 'src/app/shared/service/handler/handler-error.service';
import { AlertService } from 'src/app/shared/service/alert.service';

@Injectable()
export class TechnologyUseCaseService implements ServiceForm {

  private _messageError!: string;

  constructor(private _technologyAdapter: TechnologyGateway,
    private _handlerError: HandlerErrorService,
    private _alertService: AlertService) { }

  register(technology: Technology): Observable<void>{
    return this._technologyAdapter.registerTechnology(technology)
      .pipe(
        catchError((error) => {
          this._messageError = this._handlerError.handler(error);
          this._alertService.showAlert(this._messageError);
          return throwError(()=> error);
        }));
  }

}
