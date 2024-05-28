import { Component, EventEmitter, Output } from '@angular/core';
import { GetService } from 'src/app/domain/interface/api-service';
import { Pagination, KeyEnum } from 'src/app/domain/interface/pagination';
import { Technology } from 'src/app/domain/models/technology';
import { ListModelService } from 'src/app/shared/service/observables/list-model.service';

type OptionSelect = {
  value: number, 
  name: string
}

type ButtonDirection = {
  icon: string,
  text: string
}

type Pages = {
  contents:  number | string ,
  value: number,
  className?: string
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
  buttonDirection!: ButtonDirection;
  size!: number;
  direction!: string
  models: Technology[] = [];
  KeyEnum = KeyEnum;

  pages: Pages[] = [];
  currentPage = 1;
  totalPages!: number;
  firstPage = true;
  lastPage = false;

  constants = {
    ONE_VALUE: 1,
    TWO_VALUE: 2,
    THREE_VALUE: 3,
    FOUR_VALUE: 4,
    DOTS_KEY: '...',
    PAGINATION_NUMBER_CLASS: 'paginationNumber',
    PAGINATION_DOTS_CLASS: 'paginationDots',
    ACTIVE_CLASS: 'page--active',
    EMPTY_STRING: '',
  };

  constructor(private getService: GetService, private _serviceListModel: ListModelService) {
    
    this.fillContentSelectSize();
    this.fillContentButton();
    this.loadInitialValues();
    this.fillObjectPagination();
    this._serviceListModel.loadDate(this.getService, this._paginationDate);
    this.populateModelList();
  }



  private createPagination(): Pages[] {

    this.pages = [];

    if(this.isSinglePage()) {
      this.addSinglePage();
    }

    if(this.shouldAddConsecutivePages()) {
      this.addConsecutivePages(); 
    }

    if(this.hasMultiplePages()) {

      this.addPagesForLastPage();
      this.addPenultimePage();
      this.addDotsAndLastPage();
      this.addFirstPageAndDots();
      this.addLastPage();
    }

    console.log(this.currentPage);
    return this.pages;
  }

  private createDataPage(text: string | number, value: number, className?: string): Pages {
    return {
      contents: text,
      value: value,
      className: className
    };
  }


  private isSinglePage(): boolean {
    return this.currentPage === this.constants.ONE_VALUE && this.totalPages == this.constants.ONE_VALUE;
  }

  private shouldAddConsecutivePages(): boolean {
    //LLena el array con tres numeros, sin superar la cantidad total de paginas ni la pagina actual + dos paginas
    return this.currentPage < this.totalPages;
  }

  private hasMultiplePages(): boolean {
    return this.totalPages >= this.constants.TWO_VALUE;
  }

  private addSinglePage(): void {
    this.pages.push(
      this.createDataPage(this.constants.ONE_VALUE, this.constants.ONE_VALUE, this.constants.ACTIVE_CLASS)
    );
  }

  private addConsecutivePages(): void {
    for (let index = this.currentPage; (index <= this.totalPages) && (index <= (this.currentPage + this.constants.TWO_VALUE)); index++) {
      this.pages.push(this.createDataPage(index, index, (index === this.currentPage) ? this.constants.ACTIVE_CLASS : ''));
    }
  }

  private addPagesForLastPage(): void {

    //LLena el array con tres numeros, pero esta vez desde la ultima pagina hasta la ante penultima
    if(this.currentPage === this.totalPages) {
        
      const beforePenultimatePage = this.totalPages - this.constants.TWO_VALUE;

      for(let index = this.currentPage; (index >= beforePenultimatePage) && (index >= this.constants.ONE_VALUE); index--) {
          this.pages.unshift(this.createDataPage(index, index, (index === this.currentPage) ? this.constants.ACTIVE_CLASS : ''));
      }
    }
  }

  private addPenultimePage(): void {

    const penultimatePosition = this.totalPages - this.constants.ONE_VALUE;
    const beforePenultimatePosition = this.totalPages - this.constants.TWO_VALUE;

    //Agrega la ante penultima pagina, si se esta en la penultima pagina y que la ante penultima es mayor igual a 1, ejemplo -> 9 -> array[8,9,10]
    if(this.currentPage === penultimatePosition  && beforePenultimatePosition >= this.constants.ONE_VALUE) { 

        this.pages.unshift(this.createDataPage(beforePenultimatePosition, beforePenultimatePosition));
    }
  }

  private addDotsAndLastPage(): void {
    //agrega un string "..." y la ultima posición, si la suma entre la pagina actual y tres posciones mas siguen siendo menor al total de paginas
    if((this.currentPage + this.constants.THREE_VALUE) < this.totalPages) { 

      this.pages.push(
        this.createDataPage(this.constants.DOTS_KEY, this.currentPage),
        this.createDataPage(String(this.totalPages), this.totalPages)
      );
    }
  }

  private addFirstPageAndDots(): void {

    const beforePenultimatePosition = this.totalPages - this.constants.TWO_VALUE;
    
    if(this.totalPages >= this.constants.FOUR_VALUE && this.currentPage >= beforePenultimatePosition) {

      this.pages.unshift(
        this.createDataPage(this.constants.ONE_VALUE,this.constants.ONE_VALUE), 
        this.createDataPage(this.constants.DOTS_KEY, this.currentPage)
      );
    }
  }

  private addLastPage(): void {
    if(this.currentPage + this.constants.THREE_VALUE === this.totalPages) {

      this.pages.push(this.createDataPage(this.totalPages, this.totalPages));
    }
  }

  paginate(value: number): void {
    this.currentPage = value;
    this.pages = this.createPagination();
    this.updatePage(this.currentPage - 1);
  }

  private fillContentSelectSize(){
    this.optionSize = [
      {value: 2, name: "2 por página"},
      {value: 5, name: "5 por página"},
      {value: 10, name: "10 por página"}
    ]
  }

  private fillContentButton(): void {
    this.buttonDirection = {
      icon: 'fa-solid fa-arrow-up-wide-short',
      text: 'ASC'
    };
  }

  loadInitialValues(): void {
    this.size = this.optionSize[0].value;
    this.direction = this.buttonDirection.text;
  }

  changeStateDirection() {
    
    this.buttonDirection =  (this.buttonDirection.text != 'ASC') ? 
    {icon: 'fa-solid fa-arrow-up-wide-short', text: 'ASC'} : 
    {icon: 'fa-solid fa-arrow-down-wide-short', text: 'DESC'};
    
    this.updateDirection(this.buttonDirection.text);
  }

  private fillObjectPagination(): void {
      this._paginationDate = {
        size: this.size,
        direction: this.direction,
        page: (this.currentPage - 1)
      }
  }

  private populateModelList(): void {

    this._serviceListModel.modelObservable$.subscribe((data) => {

      this.displayContentStatus(!data.empty);
      this.models = data.content;
      this.currentPage = data.pageNumber + 1;
      this.totalPages = data.totalPages;
      this.firstPage = data.first;
      this.lastPage = data.last;
      this.pages = this.createPagination();
    });
  }

  private updateList(paginationDate: Pagination): void {
   this._serviceListModel.updateObservable(paginationDate);
  }

  displayContentStatus(status: boolean): void {
    this.displayContent.emit(status);
  }

  updateSize(value: number): void {
    this._paginationDate.size = value;
    this._paginationDate.page = 0;
    this.updateList(this._paginationDate);
  }

  updateDirection(direction: string): void {
    this._paginationDate.direction = direction;
    this.updateList(this._paginationDate);
  }

  updatePage(value: number): void {
    this._paginationDate.page = value;
    this.updateList(this._paginationDate);
  }
}
