import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { GetService } from 'src/app/domain/interface/api-service';
import { Pagination } from 'src/app/domain/interface/pagination';
import { Page } from '../interface/Page';
import { ModelsApi } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})

export class ListModelService {

  private service!: GetService;
  private _modelSubject!: BehaviorSubject<Pagination>;
  modelObservable$! : Observable<Page<ModelsApi>>;

  loadDate(service: GetService, pagination: Pagination) {
    this.service = service;
    this._modelSubject = new BehaviorSubject<Pagination>(pagination);
    this.modelObservable$ = this.createModelObservable();
  }

  private createModelObservable(): Observable<Page<ModelsApi>> {
    return this._modelSubject.asObservable().pipe(
      switchMap((paginationDate) => this.service.getAll(paginationDate))
    )
  }

  updateObservable(paginationDate: Pagination): void {
    this._modelSubject.next(paginationDate);
  }

}
