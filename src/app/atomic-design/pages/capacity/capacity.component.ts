import { Component, OnInit } from '@angular/core';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { GetService } from 'src/app/domain/interface/api-service';
import { CapacityUseCaseService } from 'src/app/domain/usecase/capacity-use-case.service';
import { OptionSelect } from '../../molecules/select/select.component';

@Component({
  selector: 'app-content-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss'],
  providers: [
   // {provide: ValidationForm, useClass: ValidationTechnologyService},
   // {provide: ServiceForm, useClass: TechnologyUseCaseService},
    {provide: GetService, useClass: CapacityUseCaseService}
  ]
})
export class ContentCapacityComponent implements OnInit {

  displayContentList = true;
  displaySelectOrder = true;
  private _isShowFrom = false;

  dataButton!: buttonStructure;
  optionOrdering!: OptionSelect<string>[]

  constructor() {
    this.fillContentButton();
    this.fillContentSelectOrdering();
  }

  ngOnInit(): void {
  }

  changeVisibilityModelList(status: boolean): void {
    this.displayContentList = status;
  }

  changeStateFrom(): void {
    this._isShowFrom = !this._isShowFrom;
  }

  private fillContentButton(): void {
    this.dataButton = {
      showIcon: true,
      icon: 'fa-solid fa-plus',
      text: 'Crear'
    };
  }

  private fillContentSelectOrdering(){
    this.optionOrdering = [
      {value: 'name', name: "nombre"},
      {value: 'technologies', name: "cantidad de tecnologías"}
    ]
  }

}
