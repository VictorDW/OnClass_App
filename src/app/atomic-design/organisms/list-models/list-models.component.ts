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
  value: number
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

  pageNumbers: Pages[] = [];
  currentPage = 1;
  pageAmount!: number;
  constants = {
    ONE_VALUE: 1,
    TWO_VALUE: 2,
    THREE_VALUE: 3,
    FOUR_VALUE: 4,
    DOTS_KEY: '...',
    PAGINATION_NUMBER_CLASS: 'paginationNumber',
    PAGINATION_DOTS_CLASS: 'paginationDots',
    ACTIVE_CLASS: 'active',
    EMPTY_STRING: ''
  };

  constructor(private getService: GetService, private _serviceListModel: ListModelService) {
    
    this.fillContentSelectSize();
    this.fillContentButton();
    this.loadInitialValues();
    this.fillObjectPagination();
    this._serviceListModel.loadDate(this.getService, this._paginationDate);
    this.populateModelList();
  }


   getPageNumbers(): Pages[] {

    this.pageNumbers = [];

    if(this.currentPage === this.constants.ONE_VALUE && this.pageAmount == this.constants.ONE_VALUE) {
      this.pageNumbers.push({
        contents: String(this.constants.ONE_VALUE), 
        value: this.constants.ONE_VALUE
      });
    }

    if(this.currentPage < this.pageAmount && this.currentPage !== this.pageAmount) { //LLena el array con tres numeros, sin superar la cantidad total de paginas ni la pagina actual + dos posiciones mas
      
      for(let index = this.currentPage; (index <= this.pageAmount) && (index <= (this.currentPage + this.constants.TWO_VALUE) ); index++) {
        
        this.pageNumbers.push({
          contents: String(index), 
          value: index
        });
      }

      
    }

   if(this.pageAmount >= this.constants.TWO_VALUE) {//Solo aplica cuando hay mas de do paginas

      if(this.currentPage === this.pageAmount) {//LLena el array con tres numeros, pero esta vez desde la ultima pagina hasta la penultima
        
        for(let index = this.currentPage; index >= (this.pageAmount - this.constants.TWO_VALUE); index--) {
          if(index >= this.constants.ONE_VALUE) {
            this.pageNumbers.unshift({
              contents: String(index), 
              value: index, 
            });
          }
        }
      }

      if(this.currentPage === (this.pageAmount - this.constants.ONE_VALUE) && (this.pageAmount - this.constants.TWO_VALUE) >= this.constants.ONE_VALUE) { //Agrega la penultima posición, si se esta en la ante penultima pagina, ejemplo -> 9 -> array[8,9,10]
        
        const penulPosition = this.pageAmount - this.constants.TWO_VALUE
        
          this.pageNumbers.unshift({
            contents: String(penulPosition), 
            value: penulPosition,
          });
      }

      //agrega un string "..." y la ultima posición, si la suma entre la pagina actual y tres posciones mas siguen siendo menor al total de paginas
      if((this.currentPage + this.constants.THREE_VALUE) < this.pageAmount) { 

        this.pageNumbers.push({
          contents: this.constants.DOTS_KEY,
          value: this.currentPage
        },{
          contents: String(this.pageAmount),
          value: this.pageAmount,
        });
      }

      //agrega la primera posición y  un string "...", cuando el tolal de paginas es mayor o igual a 4, y ademas la pagina actual es mayor o igual a la penultima pagina
      if(this.pageAmount >= this.constants.FOUR_VALUE && this.currentPage >= (this.pageAmount - this.constants.TWO_VALUE)) {

        this.pageNumbers.unshift({
          contents: this.constants.ONE_VALUE,
          value: this.constants.ONE_VALUE
        }, {
          contents: this.constants.DOTS_KEY,
          value: this.currentPage
        })
      }

      //agrega la ultima pagina, cuando la pagina actual + tres posiciones mas es igual al total de paginas
      if(this.currentPage + this.constants.THREE_VALUE === this.pageAmount) {

        this.pageNumbers.push({
          contents: String(this.pageAmount),
          value: this.pageAmount,
        });
      }

    
    }

    return this.pageNumbers;
  }

  paginate(value: number): void {
    this.currentPage = value;
    this.pageNumbers = this.getPageNumbers();
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
      this.pageAmount = data.totalPages;
      this.pageNumbers = this.getPageNumbers();
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
    console.log(this._paginationDate)
    this.updateList(this._paginationDate);
  }

  updateDirection(direction: string): void {
    this._paginationDate.direction = direction;
    this.updateList(this._paginationDate);
  }

  updatePage(value: number): void {
    this._paginationDate.page = value;
    console.log(this._paginationDate)
    this.updateList(this._paginationDate);
  }


}
