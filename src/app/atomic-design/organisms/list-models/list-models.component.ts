import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, Observable, count, switchMap } from 'rxjs';
import { GetService } from 'src/app/domain/interface/api-service';
import { Technologies, Technology } from 'src/app/domain/models/technology';

@Component({
  selector: 'app-list-models',
  templateUrl: './list-models.component.html',
  styleUrls: ['./list-models.component.scss']
})
export class ListModelsComponent{

  @Output() displayContent = new EventEmitter<boolean>();
  selectedValue = 2;
  count: number = 2;
  
  private _modelSubject = new BehaviorSubject<number>(this.selectedValue);
  
  models: Technology[] = [];
  modelObservable$ : Observable<Technologies>

  /*techs$ = this._modelSubject.asObservable().pipe(
    switchMap((num) => this.getService.getAll({size: num}))
  );*/
  
  constructor(private getService: GetService) {
    this.modelObservable$ = this.createModelObservable();
    this.populateModelList();
  }
  
  createModelObservable(): Observable<Technologies> {
    return this._modelSubject.asObservable().pipe(
      switchMap((pageSize) => this.getService.getAll({size: pageSize}))
    )
  }

  populateModelList(): void {
    this.modelObservable$.subscribe((data) => {
      this.displayContentStatus(!data.empty);
      this.models = data.content;
    });
  }

  displayContentStatus(status: boolean): void {
    this.displayContent.emit(status);
  }

  updateSelectedSize(value: number): void {
    this.count += value;
    this._modelSubject.next(this.count);
  }

}
