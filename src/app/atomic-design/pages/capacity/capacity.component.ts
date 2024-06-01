import { Component, OnInit } from '@angular/core';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { TechnologyUseCaseService } from 'src/app/domain/usecase/technology-use-case.service';
import { GetService } from 'src/app/domain/interface/api-service';

@Component({
  selector: 'app-content-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss'],
  providers: [
   // {provide: ValidationForm, useClass: ValidationTechnologyService},
   // {provide: ServiceForm, useClass: TechnologyUseCaseService},
    {provide: GetService, useClass: TechnologyUseCaseService}
  ]
})
export class ContentCapacityComponent implements OnInit {

  displayContentList = true;
  private _isShowFrom = false;
  
  dataButton!: buttonStructure;
  
  constructor() { 
    this.fillContentButton();
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

}
