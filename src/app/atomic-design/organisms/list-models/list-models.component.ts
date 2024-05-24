import { Component, EventEmitter, Output } from '@angular/core';
import { GetService } from 'src/app/domain/interface/api-service';
import { Pagination, KeyEnum } from 'src/app/domain/interface/pagination';
import { Technology } from 'src/app/domain/models/technology';
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
  size!: number;
  models: Technology[] = [];
  KeyEnum = KeyEnum;
  
  constructor(private getService: GetService, private _serviceListModel: ListModelService) {
    this.fillContentSelectSize();
    this.loadInitialValues();
    this.fillObjectPagination();
    this._serviceListModel.loadDate(this.getService, this._paginationDate);
    this.populateModelList();
  }

  fillContentSelectSize(){
    this.optionSize = [
      {value: 2, name: "2 por página"},
      {value: 5, name: "5 por página"},
      {value: 10, name: "10 por página"}
    ]
  } 

  loadInitialValues(): void {
    this.size = this.optionSize[0].value;
  }

 fillObjectPagination(): void {
    this._paginationDate = {
      size: this.size,
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

  updateSelectedValue(key: KeyEnum , newValue: number | string): void {
    this._paginationDate[key] = newValue;
    this.updateList(this._paginationDate);
  }

}
