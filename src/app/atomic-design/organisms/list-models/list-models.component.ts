import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GetService } from 'src/app/domain/interface/api-service';
import { Pagination } from 'src/app/domain/interface/pagination';
import { ListModelService } from 'src/app/shared/service/observables/list-model.service';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { UpdateListServerService } from 'src/app/shared/service/observables/update-list.service';
import { Observable, Subscription, map } from 'rxjs';
import { OptionSelect } from '../../molecules/select/select.component';
import { DEFAULT_ORDER_BY, DEFAULT_VALUE_FOR_PAGINATION, Direction, ModelsApi, SelectSize } from 'src/app/shared/constants/constants';
import { Page } from 'src/app/shared/service/interface/Page';


type ButtonDirection = {
  icon: string,
  text: string
}

type Pages = {
  content:  number | string ,
  value: number,
}

@Component({
  selector: 'app-list-models',
  templateUrl: './list-models.component.html',
  styleUrls: ['./list-models.component.scss']
})

export class ListModelsComponent implements OnInit, OnDestroy {
  @Input()  displaySelectOrder: boolean
  @Input()  optionOrdering!: OptionSelect<string>[];
  @Input()  dataButton!: buttonStructure;
  @Input()  messageCreateModel!: string;
  @Output() showFrom = new EventEmitter<void>();

  private _paginationDate!: Pagination;
  private _updateListSubscription!: Subscription;

  displayContentList = true;
  optionSize!: OptionSelect<number>[];
  buttonDirection!: ButtonDirection;
  listmodelObservation$!: Observable<Page<ModelsApi>>;

  models: ModelsApi[] = [];
  pages: Pages[] = [];
  one_value = DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE;
  currentPage = DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE;
  totalPages!: number;
  firstPage = true;
  lastPage = false;

  constructor(private getService: GetService,
              private _serviceListModel: ListModelService,
              private _updateList: UpdateListServerService) {

    this.displaySelectOrder = false;
    this.fillContentSelectSize();
    this.fillContentButton();
  }

  ngOnInit(): void {

    this.fillObjectPagination();
    this.addOrdering();
    this._serviceListModel.loadDate(this.getService, this._paginationDate);
    this.listmodelObservation$ = this.populateModelList();
    this.update();
  }

  private fillContentSelectSize(){
    this.optionSize = SelectSize;
  }

  private fillContentButton(): void {
    this.buttonDirection = Direction.ASC;
  }

  changeStateDirection() {
    this.buttonDirection =  (this.buttonDirection.text != 'ASC') ? Direction.ASC : Direction.DESC;
    this.updateDirection(this.buttonDirection.text);
  }

  displayFrom() {
    return this.showFrom.emit();
  }

  private fillObjectPagination(): void {
      this._paginationDate = {
        size: this.optionSize[0].value,
        direction: this.buttonDirection.text,
        page: (this.currentPage - DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE),
      }
  }

  private addOrdering() {
    if(this.displaySelectOrder) {
      this._paginationDate.orderBy = DEFAULT_ORDER_BY;
    }
  }

  private populateModelList(): Observable<Page<ModelsApi>> {

    return this._serviceListModel.modelObservable$.pipe(
      map((data) => {

        this.models = data.content;
        this.currentPage = (data.pageNumber + DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE);
        this.totalPages = data.totalPages;
        this.firstPage = data.first;
        this.lastPage = data.last;
        this.pages = this.createPagination();

        return data;
      })
    );
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
    return value === this.currentPage && content !== DEFAULT_VALUE_FOR_PAGINATION.DOTS_KEY;
  }

  private createDataPage(text: string | number, value: number): Pages {
    return {
      content: text,
      value: value
    };
  }

  private isSinglePage(): boolean {
    return this.currentPage === DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE &&
           this.totalPages === DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE;
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
        this.createDataPage(this.totalPages, this.totalPages)
      );
    }
  }

  private addFirstPageAndDots(): void {

    const beforePenultimatePosition = this.totalPages - DEFAULT_VALUE_FOR_PAGINATION.TWO_VALUE;

    if(this.totalPages >= DEFAULT_VALUE_FOR_PAGINATION.FOUR_VALUE && this.currentPage >= beforePenultimatePosition) {

      this.pages.unshift(
        this.createDataPage(DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE,DEFAULT_VALUE_FOR_PAGINATION.ONE_VALUE),
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

  private update() {
    this._updateListSubscription = this._updateList.updateList$.subscribe(() => {
      this.updateList(this._paginationDate);
    });
  }

  displayContentStatus(status: boolean): void {
    this.displayContentList = status;
  }

  setPaginate(value: number): void {
    this.currentPage = value;
    this.updatePage(this.currentPage - 1);
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
    this._updateListSubscription.unsubscribe();
  }
}
