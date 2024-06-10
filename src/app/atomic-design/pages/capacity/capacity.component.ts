import { Component } from '@angular/core';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { GetAllWithoutPaginationService, GetService, ServiceForm } from 'src/app/domain/interface/api-service';
import { CapacityUseCaseService } from 'src/app/domain/usecase/capacity-use-case.service';
import { OptionSelect } from '../../molecules/select/select.component';
import { MessageTechnology, Models, ResponseMessages, StyleButton, ValidationMessageCapacity, dataToAddListModels } from 'src/app/shared/constants/constants';
import { InputContentStructure } from '../../organisms/form/util/InputContentStructure';
import { ValidationForm } from 'src/app/shared/service/interface/validation';
import { TechnologyUseCaseService } from 'src/app/domain/usecase/technology-use-case.service';
import { Observable, map } from 'rxjs';
import { TechnologyBasic } from 'src/app/domain/models/technology';
import { ValidationCapacityService } from 'src/app/shared/service/validations/validation-capacity.service';

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

  dataButton: buttonStructure;
  dataInputContent!: InputContentStructure[]
  dataAddModel!: dataToAddListModels
  optionOrdering!: OptionSelect<string>[]
  messageCreateModel: string = ResponseMessages.CREATE_MODEL_EMPTY.replace('{model}', Models.CAPACITY);
  titleForm: string =  ResponseMessages.CREATE_MODEL.replace('{model}', Models.CAPACITY);
  titleModal: string = ResponseMessages.SUSSESS_MODEL.replace('{model}', Models.CAPACITY);
  private _DEFAULT_MIN_NUMBER_TECHNOLOGIES = 3;
  private _DEFAULT_MAX_NUMBER_TECHNOLOGIES = 20;

  constructor( private _getAllTechnology: GetAllWithoutPaginationService) {
    this.createDataModel();
    this.dataButton = StyleButton.CREATE;
    this.fillContentSelectOrdering();
    this.fillContentInput();
  }


  get showFrom() {
    return this._isShowFrom;
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

  changeStateFrom(): void {
    this._isShowFrom = !this._isShowFrom;
  }

  private getTecnologies(): Observable<TechnologyBasic[]> {
    return this._getAllTechnology.getAllWithoutPagination().pipe(
      map((technologies) => {
        return technologies.length > 0 ? technologies : [{name: MessageTechnology.TECNOLOGIES_EMPTY}];
      })
    );
  }

  private createDataModel(): void {

    this.getTecnologies().subscribe((content) => {

      this.dataAddModel = {
        content: content,
        placeholder: MessageTechnology.PLACEHOLDER_TECNOLOGIES,
        label: MessageTechnology.LABEL_TECHNOLOGIES,
        fieldArrayModel: MessageTechnology.FIELD_ARRAY_TECHNOLOGY,
        validationMessage: ValidationMessageCapacity['VALIDATION_TECHNOLOGIES'],
        customizedValidation: (selectModels: TechnologyBasic[]) => {
          return selectModels.length >= this._DEFAULT_MIN_NUMBER_TECHNOLOGIES &&
                selectModels.length <= this._DEFAULT_MAX_NUMBER_TECHNOLOGIES
        }
      }
    });
  }




}
