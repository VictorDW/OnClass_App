import { Injectable } from '@angular/core';
import { GetService, ServiceForm } from '../../interface/api-service';
import { Observable, catchError, throwError } from 'rxjs';
import { HandlerErrorService } from 'src/app/shared/service/handler/handler-error.service';
import { AlertService } from 'src/app/shared/service/observables/alert.service';
import { BootcampGateway } from '../../gateway/bootcamp-gateway';
import { Bootcamp } from '../../models/bootcamp';
import { ModelsApi } from 'src/app/shared/constants/constants';
import { Page } from 'src/app/shared/service/interface/Page';
import { Pagination } from '../../interface/pagination';

@Injectable()
export class BootcampUseCaseService implements ServiceForm, GetService {

  private _messageError!: string;

  constructor(private _bootcampAdapter: BootcampGateway,
              private _handlerError: HandlerErrorService,
              private _alertService: AlertService) { }


  register(bootcamp: Bootcamp): Observable<void> {
    return this._bootcampAdapter.registerBootcamp(bootcamp)
      .pipe(
        catchError((error) => {
          this._messageError = this._handlerError.handler(error);
          this._alertService.showAlert(this._messageError);
          return throwError(()=> error);
        }));
  }

  getAll(pagination: Pagination): Observable<Page<ModelsApi>> {
    return this._bootcampAdapter.getBootcamps(pagination)
      .pipe(
        catchError((error) => {
          this._messageError = this._handlerError.handler(error);
          this._alertService.showAlert(this._messageError);
          return throwError(()=> error);
        })
      );
  }
}
