import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { GetService } from 'src/app/domain/interface/api-service';
import { Pagination } from 'src/app/domain/interface/pagination';
import { Technologies } from 'src/app/domain/models/technology';

@Injectable({
  providedIn: 'root'
})

export class ListModelService {

  private service!: GetService;
  private _modelSubject!: BehaviorSubject<Pagination>;
  modelObservable$! : Observable<Technologies>;

  loadDate(service: GetService, pagination: Pagination) {
    this.service = service;
    this._modelSubject = new BehaviorSubject<Pagination>(pagination);
    this.modelObservable$ = this.createModelObservable();
  }

  private createModelObservable(): Observable<Technologies> {
    return this._modelSubject.asObservable().pipe(
      switchMap((paginationDate) => this.service.getAll(paginationDate))
    )
  }

  updateObservable(paginationDate: Pagination): void {
    this._modelSubject.next(paginationDate);
  }

}
