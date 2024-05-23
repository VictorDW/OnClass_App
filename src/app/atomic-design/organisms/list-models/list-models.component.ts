import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, Observable, count, switchMap } from 'rxjs';
import { GetService } from 'src/app/domain/interface/api-service';
import { Pagination } from 'src/app/domain/interface/pagination';
import { Technologies, Technology } from 'src/app/domain/models/technology';

type OptionSelect = {
  value: number, 
  name: string
}

@Component({
  selector: 'app-list-models',
  templateUrl: './list-models.component.html',
  styleUrls: ['./list-models.component.scss']
})
export class ListModelsComponent {

  @Output() displayContent = new EventEmitter<boolean>();

  optionSize = this.fillContentSelect();
  selectedSize = this.optionSize[0].value;
  models: Technology[] = [];
  modelObservable$ : Observable<Technologies>;

  private _paginationDate: Pagination = {
    size: this.selectedSize
  }
  private _modelSubject = new BehaviorSubject<Pagination>(this._paginationDate);
  
  
  constructor(private getService: GetService) {
    this.fillContentSelect();
    this.modelObservable$ = this.createModelObservable();
    this.populateModelList();
  }

  fillContentSelect(): OptionSelect[] {
    return [
      {value: 2, name: "2 por página"},
      {value: 5, name: "5 por página"},
      {value: 10, name: "10 por página"}
    ]
  }
  
  private createModelObservable(): Observable<Technologies> {
    return this._modelSubject.asObservable().pipe(
      switchMap((paginationDate) => this.getService.getAll(paginationDate))
    )
  }

  private populateModelList(): void {
    this.modelObservable$.subscribe((data) => {
      this.displayContentStatus(!data.empty);
      this.models = data.content;
    });
  }

  private updateObservable(paginationDate: Pagination): void {
    this._modelSubject.next(paginationDate);
  }

  displayContentStatus(status: boolean): void {
    this.displayContent.emit(status);
  }

  updateSelectedSize(): void {
    this._paginationDate.size = this.selectedSize;
    this.updateObservable(this._paginationDate);
  }

}
