import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { OptionSelect } from '../../molecules/select/select.component';
import { Pagination } from 'src/app/domain/interface/pagination';
import { Direction, SelectSize } from 'src/app/shared/constants/constants';

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
export class ListBootcampsComponent implements OnInit {

  @Input()  optionOrdering!: OptionSelect<string>[];
  @Input()  dataButton!: buttonStructure;
  @Input()  messageCreateModel!: string;
  @Output() showFrom = new EventEmitter<void>();

  private _paginationDate!: Pagination;

  optionSize!: OptionSelect<number>[];
  buttonDirection!: ButtonDirection;
  displayContentList = true;

  constructor() {
    this.fillContentSelectSize();
    this.fillContentButton();
  }

  ngOnInit(): void {
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

  changeStateDirection() {
    this.buttonDirection =  (this.buttonDirection.text != 'ASC') ? Direction.ASC : Direction.DESC;
    this.updateDirection(this.buttonDirection.text);
  }

  private updateList(paginationDate: Pagination): void {
    console.log(paginationDate);
    //this._serviceListModel.updateObservable(paginationDate);
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
}
