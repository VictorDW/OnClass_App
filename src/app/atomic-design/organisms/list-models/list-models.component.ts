import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, Observable, count, switchMap } from 'rxjs';
import { GetService } from 'src/app/domain/interface/api-service';
import { Pagination } from 'src/app/domain/interface/pagination';
import { Technologies, Technology } from 'src/app/domain/models/technology';
import { ListModelService } from 'src/app/shared/service/observables/list-model.service';

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

  private _paginationDate!: Pagination;

  optionSize!: OptionSelect[];
  selectedSize: number;
  models: Technology[] = [];
  
  constructor(private getService: GetService, private _serviceListModel: ListModelService) {
    this.fillContentSelect();
    this.selectedSize = this.optionSize[0].value;
    this.fillObjectPagination();
    this._serviceListModel.loadDate(this.getService, this._paginationDate);
    this.populateModelList();
  }

  fillContentSelect(){
    this.optionSize = [
      {value: 2, name: "2 por página"},
      {value: 5, name: "5 por página"},
      {value: 10, name: "10 por página"}
    ]
  } 

  fillObjectPagination() {
    this._paginationDate = {
      size: this.selectedSize,
    }
  }

  private populateModelList(): void {
    this._serviceListModel.modelObservable$.subscribe((data) => {
      this.displayContentStatus(!data.empty);
      this.models = data.content;
    });
  }

  private updateList(paginationDate: Pagination): void {
   this._serviceListModel.updateObservable(paginationDate);
  }

  displayContentStatus(status: boolean): void {
    this.displayContent.emit(status);
  }

  updateSelectedSize(): void {
    this._paginationDate.size = this.selectedSize;
    this.updateList(this._paginationDate);
  }

}
