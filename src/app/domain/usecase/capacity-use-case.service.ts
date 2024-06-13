import { Injectable } from '@angular/core';
import { GetAllWithoutPaginationService, GetService, ServiceForm } from '../interface/api-service';
import { Observable, catchError, throwError } from 'rxjs';
import { ModelsApi } from 'src/app/shared/constants/constants';
import { Page } from 'src/app/shared/service/interface/Page';
import { Pagination } from '../interface/pagination';
import { Capacity, CapacityBasic } from '../models/capacity';
import { CapacityGateway } from '../gateway/capacity-gateway';
import { HandlerErrorService } from 'src/app/shared/service/handler/handler-error.service';

@Injectable()
export class CapacityUseCaseService implements ServiceForm, GetService, GetAllWithoutPaginationService {

  constructor(private _capacityAdapter: CapacityGateway,
              private _handlerError: HandlerErrorService) {

  }


  register(capacity: Capacity): Observable<void> {
    return this._capacityAdapter.registerCapacity(capacity)
      .pipe(
        catchError((error) => {
          this._handlerError.handler(error);
          return throwError(()=> error);
        }));
  }

  getAll(pagination: Pagination): Observable<Page<ModelsApi>> {
    return this._capacityAdapter.getCapacities(pagination)
    .pipe(
      catchError((error) => {
        this._handlerError.handler(error);
        return throwError(()=> error);
      })
    );
  }

  getAllWithoutPagination(): Observable<CapacityBasic[]> {
    return this._capacityAdapter.getCapacitesWithoutPagination();
  }
}
