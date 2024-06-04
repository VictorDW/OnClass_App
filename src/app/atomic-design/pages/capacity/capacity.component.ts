import { Component } from '@angular/core';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { GetService, ServiceForm } from 'src/app/domain/interface/api-service';
import { CapacityUseCaseService } from 'src/app/domain/usecase/capacity-use-case.service';
import { OptionSelect } from '../../molecules/select/select.component';
import { Models, ResponseMessages } from 'src/app/shared/constants/constants';
import { InputContentStructure } from '../../organisms/form/util/InputContentStructure';
import { ValidationForm } from 'src/app/shared/service/interface/validation';
import { ValidationTechnologyService } from 'src/app/shared/service/validations/validation-technology.service';
import { TechnologyUseCaseService } from 'src/app/domain/usecase/technology-use-case.service';

@Component({
  selector: 'app-content-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss'],
  providers: [
    {provide: ValidationForm, useClass: ValidationTechnologyService},
    {provide: ServiceForm, useClass: TechnologyUseCaseService},
    {provide: GetService, useClass: CapacityUseCaseService}
  ]
})
export class ContentCapacityComponent{

  displayContentList = true;
  displaySelectOrder = true;
  private _isShowFrom = false;

  dataButton!: buttonStructure;
  dataInputContent!: InputContentStructure[]
  optionOrdering!: OptionSelect<string>[]
  titleForm: string =  ResponseMessages.CREATE_MODEL.replace('{model}', Models.CAPACITY);
  titleModal: string = ResponseMessages.SUSSESS_MODEL.replace('{model}', Models.CAPACITY);

  constructor() {
    this.fillContentButton();
    this.fillContentSelectOrdering();
    this.fillContentInput();
  }


  get showFrom() {
    return this._isShowFrom;
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

  private fillContentInput(): void {

    this.dataInputContent = [
       {
         label: 'Nombre',
         placeholder: 'Nombre de la capacidad',
         controle: 'name'
       },{
         label: 'Descripción',
         placeholder: 'Descripción de la capacidad',
         controle: 'description'
       }
     ]
   }

}
