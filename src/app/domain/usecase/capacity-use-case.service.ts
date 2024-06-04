import { Injectable } from '@angular/core';
import { GetService, ServiceForm } from '../interface/api-service';
import { Observable, catchError, throwError } from 'rxjs';
import { ModelsApi } from 'src/app/shared/constants/constants';
import { Page } from 'src/app/shared/service/interface/Page';
import { Pagination } from '../interface/pagination';
import { Capacity } from '../models/capacity';
import { CapacityGateway } from '../gateway/capacity-gateway';
import { HandlerErrorService } from 'src/app/shared/service/handler/handler-error.service';
import { AlertService } from 'src/app/shared/service/observables/alert.service';

@Injectable()
export class CapacityUseCaseService implements ServiceForm, GetService {

  private _messageError!: string;

  constructor(private _capacityAdapter: CapacityGateway, 
              private _handlerError: HandlerErrorService,
              private _alertService: AlertService) {

  }


  register(capacity: Capacity): Observable<void> {
    throw new Error('Method not implemented.');
  }

  getAll(pagination: Pagination): Observable<Page<ModelsApi>> {
    return this._capacityAdapter.getCapacities(pagination)
    .pipe(
      catchError((error) => {
        this._messageError = this._handlerError.handler(error);
        this._alertService.showAlert(this._messageError);
        return throwError(()=> error);
      })
    );
  }
}
