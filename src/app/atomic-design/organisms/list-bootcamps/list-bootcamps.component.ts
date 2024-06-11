import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { OptionSelect } from '../../molecules/select/select.component';
import { Pagination } from 'src/app/domain/interface/pagination';
import { DEFAULT_ORDER_BY, DEFAULT_VALUE_FOR_PAGINATION, Direction, ModelsApi, SelectSize } from 'src/app/shared/constants/constants';
import { GetService } from 'src/app/domain/interface/api-service';
import { ListModelService } from 'src/app/shared/service/observables/list-model.service';
import { UpdateListServerService } from 'src/app/shared/service/observables/update-list.service';
import { Subscription } from 'rxjs';

type ButtonDirection = {
  icon: string,
  text: string
}

type Pages = {
  content:  number | string ,
  value: number,
}

@Component({
  selector: 'app-list-bootcamps',
  templateUrl: './list-bootcamps.component.html',
  styleUrls: ['./list-bootcamps.component.scss']
})
export class ListBootcampsComponent implements OnInit, OnDestroy {

  @Input()  optionOrdering!: OptionSelect<string>[];
  @Input()  dataButton!: buttonStructure;
  @Input()  messageCreateModel!: string;
  @Output() showFrom = new EventEmitter<void>();

  private _paginationDate!: Pagination;
  private _modelSubcription!: Subscription;
  private _updateListSubscription!: Subscription;

  displayContentList = true;
  optionSize!: OptionSelect<number>[];
  buttonDirection!: ButtonDirection;

  models: ModelsApi[] = [];
  pages: Pages[] = [];
  currentPage: number = DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE;
  totalPages!: number;
  firstPage = true;
  lastPage = false;

  constructor(private _getService: GetService,
              private _serviceListModel: ListModelService,
              private _updateList: UpdateListServerService) {

    this.fillContentSelectSize();
    this.fillContentButton();
  }

  ngOnInit(): void {
    this.fillObjectPagination();
    this._serviceListModel.loadDate(this._getService, this._paginationDate);
    this.populateModelList();
  }

  private fillContentButton(): void {
    this.buttonDirection = Direction.ASC;
  }

  private fillContentSelectSize(){
    this.optionSize = SelectSize;
  }

  displayFrom() {
    return this.showFrom.emit();
  }

  private fillObjectPagination(): void {
    this._paginationDate = {
      size: this.optionSize[0].value,
      direction: this.buttonDirection.text,
      page: (this.currentPage - DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE),
      orderBy: DEFAULT_ORDER_BY
    }
  }

  private populateModelList(): void {

    this._modelSubcription = this._serviceListModel.modelObservable$.subscribe((data) => {

      this.displayContentStatus(!data.empty);
      this.models = data.content;
      this.currentPage = (data.pageNumber + DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE);
      this.totalPages = data.totalPages;
      this.firstPage = data.first;
      this.lastPage = data.last;
      this.pages = this.createPagination();
    });
  }

  changeStateDirection() {
    this.buttonDirection =  (this.buttonDirection.text != 'ASC') ? Direction.ASC : Direction.DESC;
    this.updateDirection(this.buttonDirection.text);
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

    return this.pages;
  }

  isActivePage({value, content}: Pages): Boolean {
    return value === this.currentPage &&
          content !== DEFAULT_VALUE_FOR_PAGINATION.DOTS_KEY;
  }

  private createDataPage(text: string | number, value: number): Pages {
    return {
      content: text,
      value: value
    };
  }

  private isSinglePage(): boolean {
    return this.currentPage === DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE &&
            this.totalPages == DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE;
  }

  private shouldAddConsecutivePages(): boolean {
    //LLena el array con tres numeros, sin superar la cantidad total de paginas ni la pagina actual + dos paginas
    return this.currentPage < this.totalPages;
  }

  private hasMultiplePages(): boolean {
    return this.totalPages >= DEFAULT_VALUE_FOR_PAGINATION.TWO_VALUE;
  }

  private addSinglePage(): void {
    this.pages.push(
      this.createDataPage(DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE, DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE)
    );
  }

  private addConsecutivePages(): void {
    for (let index = this.currentPage; (index <= this.totalPages) && (index <= (this.currentPage + DEFAULT_VALUE_FOR_PAGINATION.TWO_VALUE)); index++) {
      this.pages.push(this.createDataPage(index, index));
    }
  }

  private addPagesForLastPage(): void {

    //LLena el array con tres numeros, pero esta vez desde la ultima pagina hasta la ante penultima
    if(this.currentPage === this.totalPages) {

      const beforePenultimatePage = this.totalPages - DEFAULT_VALUE_FOR_PAGINATION.TWO_VALUE;

      for(let index = this.currentPage; (index >= beforePenultimatePage) && (index >= DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE); index--) {
          this.pages.unshift(this.createDataPage(index, index));
      }
    }
  }

  private addPenultimePage(): void {

    const penultimatePosition = this.totalPages - DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE;
    const beforePenultimatePosition = this.totalPages - DEFAULT_VALUE_FOR_PAGINATION.TWO_VALUE;

    //Agrega la ante penultima pagina, si se esta en la penultima pagina y que la ante penultima es mayor igual a 1, ejemplo -> 9 -> array[8,9,10]
    if(this.currentPage === penultimatePosition  && beforePenultimatePosition >= DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE) {

        this.pages.unshift(this.createDataPage(beforePenultimatePosition, beforePenultimatePosition));
    }
  }

  private addDotsAndLastPage(): void {
    //agrega un string "..." y la ultima posición, si la suma entre la pagina actual y tres posciones mas siguen siendo menor al total de paginas
    if((this.currentPage + DEFAULT_VALUE_FOR_PAGINATION.THREE_VALUE) < this.totalPages) {

      this.pages.push(
        this.createDataPage(DEFAULT_VALUE_FOR_PAGINATION.DOTS_KEY, this.currentPage),
        this.createDataPage(String(this.totalPages), this.totalPages)
      );
    }
  }

  private addFirstPageAndDots(): void {

    const beforePenultimatePosition = this.totalPages - DEFAULT_VALUE_FOR_PAGINATION.TWO_VALUE;

    if(this.totalPages >= DEFAULT_VALUE_FOR_PAGINATION.FOUR_VALUE && this.currentPage >= beforePenultimatePosition) {

      this.pages.unshift(
        this.createDataPage(DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE, DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE),
        this.createDataPage(DEFAULT_VALUE_FOR_PAGINATION.DOTS_KEY, this.currentPage)
      );
    }
  }

  private addLastPage(): void {
    if(this.currentPage + DEFAULT_VALUE_FOR_PAGINATION.THREE_VALUE === this.totalPages) {

      this.pages.push(this.createDataPage(this.totalPages, this.totalPages));
    }
  }

  private updateList(paginationDate: Pagination): void {
    this._serviceListModel.updateObservable(paginationDate);
   }

  setPaginate(value: number): void {
    this.currentPage = value;
    this.pages = this.createPagination();
    this.updatePage(this.currentPage - 1);
  }

  displayContentStatus(status: boolean): void {
    this.displayContentList = status;
  }

  updateOrdering(value: string): void {
    this._paginationDate.orderBy = value;
    this.updateList(this._paginationDate);
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

  ngOnDestroy(): void {
    this._modelSubcription.unsubscribe();
    //this._updateListSubscription.unsubscribe();
  }
}
