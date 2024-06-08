import { Component } from '@angular/core';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { GetAllWithoutPaginationService, GetService, ServiceForm } from 'src/app/domain/interface/api-service';
import { CapacityUseCaseService } from 'src/app/domain/usecase/capacity-use-case.service';
import { OptionSelect } from '../../molecules/select/select.component';
import { Models, ModelsApiSelect, ResponseMessages, ValidationMessageCapacity } from 'src/app/shared/constants/constants';
import { InputContentStructure } from '../../organisms/form/util/InputContentStructure';
import { ValidationForm } from 'src/app/shared/service/interface/validation';
import { TechnologyUseCaseService } from 'src/app/domain/usecase/technology-use-case.service';
import { Observable, map } from 'rxjs';
import { TechnologyBasic } from 'src/app/domain/models/technology';
import { ValidationCapacityService } from 'src/app/shared/service/validations/validation-capacity.service';


export type dataModel = {
  content: ModelsApiSelect[],
  placeholder: string,
  label: string,
  arrayModel: string,
  validationMessage: string,
  validation: (selectModels: ModelsApiSelect[]) => boolean
}

@Component({
  selector: 'app-content-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss'],
  providers: [
    {provide: ValidationForm, useClass: ValidationCapacityService},
    {provide: ServiceForm, useClass: CapacityUseCaseService},
    {provide: GetAllWithoutPaginationService, useClass: TechnologyUseCaseService},
    {provide: GetService, useClass: CapacityUseCaseService}
  ]
})
export class ContentCapacityComponent{

  displaySelectOrder = true;
  displayContainerAddModel = true;
  private _isShowFrom = false;

  dataButton!: buttonStructure;
  dataInputContent!: InputContentStructure[]
  dataAddModel!: dataModel
  optionOrdering!: OptionSelect<string>[]
  messageCreateModel: string = ResponseMessages.CREATE_MODEL.replace('{model}', `una ${Models.CAPACITY}`);
  titleForm: string =  ResponseMessages.CREATE_MODEL.replace('{model}', Models.CAPACITY);
  titleModal: string = ResponseMessages.SUSSESS_MODEL.replace('{model}', Models.CAPACITY);
  private _DEFAULT_MIN_NUMBER_TECHNOLOGIES = 3;
  private _DEFAULT_MAX_NUMBER_TECHNOLOGIES = 20;

  constructor( private _getAllTechnology: GetAllWithoutPaginationService) {
    this.createDataModel();
    this.fillContentButton();
    this.fillContentSelectOrdering();
    this.fillContentInput();
  }


  get showFrom() {
    return this._isShowFrom;
  }

  private getTecnologies(): Observable<TechnologyBasic[]> {
    return this._getAllTechnology.getAllWithoutPagination().pipe(
      map((technologies) => {
        return technologies.length > 0 ? technologies : [{name: 'No se encuentran tecnologías registradas'}];
      })
    );
  }

  private createDataModel(): void {

    this.getTecnologies().subscribe((content) => {

      this.dataAddModel = {
        content: content,
        placeholder: 'Seleccione las tecnologías',
        label: 'Tecnologías',
        arrayModel: 'technologies',
        validationMessage: ValidationMessageCapacity['VALIDATION_TECHNOLOGIES'],
        validation: (selectModels: TechnologyBasic[]) => {
          return selectModels.length >= this._DEFAULT_MIN_NUMBER_TECHNOLOGIES &&
                selectModels.length <= this._DEFAULT_MAX_NUMBER_TECHNOLOGIES
        }
      }
    });
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
      {value: 'technologies', name: "tecnologías"}
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
