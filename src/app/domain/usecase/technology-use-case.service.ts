import { Injectable } from '@angular/core';
import { Observable, catchError, throwError} from "rxjs";
import { Technology, TechnologyBasic } from "../models/technology";
import { TechnologyGateway} from "../gateway/technology-gateway";
import { GetAllWithoutPaginationService, GetService, ServiceForm } from "../interface/api-service";
import { HandlerErrorService } from 'src/app/shared/service/handler/handler-error.service';
import { Pagination } from '../interface/pagination';
import { Page } from 'src/app/shared/service/interface/Page';

@Injectable()
export class TechnologyUseCaseService implements ServiceForm, GetService, GetAllWithoutPaginationService {

  constructor(private _technologyAdapter: TechnologyGateway,
    private _handlerError: HandlerErrorService) { }


  register(technology: Technology): Observable<void>{
    return this._technologyAdapter.registerTechnology(technology)
      .pipe(
        catchError((error) => {
          this._handlerError.handler(error)
          return throwError(()=> error);
        }));
  }

  getAll(pagination: Pagination): Observable<Page<Technology>> {
    return this._technologyAdapter.getTechnologies(pagination)
    .pipe(
      catchError((error) => {
        this._handlerError.handler(error)
        return throwError(()=> error);
      })
    );
  }

  getAllWithoutPagination(): Observable<TechnologyBasic[]> {
    return this._technologyAdapter.getTechnologiesWithoutPagination();
  }

}
