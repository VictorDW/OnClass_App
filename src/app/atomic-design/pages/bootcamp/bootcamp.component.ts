import { Component } from '@angular/core';
import { MessageCapacity,Models, ResponseMessages, StyleButton, ValidationMessageBootcamp, dataToAddListModels} from 'src/app/shared/constants/constants';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { InputContentStructure } from '../../organisms/form/util/InputContentStructure';
import { ValidationForm } from 'src/app/shared/service/interface/validation';
import { ServiceForm, GetAllWithoutPaginationService, GetService } from 'src/app/domain/interface/api-service';
import { CapacityUseCaseService } from 'src/app/domain/usecase/capacity-use-case.service';
import { ValidationCapacityService } from 'src/app/shared/service/validations/validation-capacity.service';
import { Observable, map } from 'rxjs';
import { BootcampUseCaseService } from 'src/app/domain/usecase/bootcamp/bootcamp-use-case.service';
import { CapacityBasic } from 'src/app/domain/models/capacity';

@Component({
  selector: 'app-bootcamp',
  templateUrl: './bootcamp.component.html',
  styleUrls: ['./bootcamp.component.scss'],
  providers: [
    {provide: ValidationForm, useClass: ValidationCapacityService},
    {provide: ServiceForm, useClass: BootcampUseCaseService},
    {provide: GetAllWithoutPaginationService, useClass: CapacityUseCaseService},
   // {provide: GetService, useClass: CapacityUseCaseService}
  ]
})
export class BootcampComponent{


  private _isShowFrom = false;
  private _DEFAULT_MIN_NUMBER_CAPACITIES = 1;
  private _DEFAULT_MAX_NUMBER_CAPACITIES = 4;

  displayContainerAddCapacity = true;
  dataButton: buttonStructure;
  dataInputContent!: InputContentStructure[];
  dataAddCapacity!: dataToAddListModels;
  messageCreateModel: string = ResponseMessages.CREATE_MODEL_EMPTY_BOOTCAMP.replace('{model}', Models.BOOTCAMP);
  titleForm: string =  ResponseMessages.CREATE_MODEL.replace('{model}', Models.BOOTCAMP);
  titleModal: string = ResponseMessages.SUSSESS_MODEL_BOOTCAMP.replace('{model}', Models.BOOTCAMP);


  constructor(private _getAllTechnology: GetAllWithoutPaginationService) {
    this.createDataCapacity();
    this.dataButton = StyleButton.CREATE;
    this.fillContentInput();
  }


  get showFrom() {
    return this._isShowFrom;
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

  private getCapacities(): Observable<CapacityBasic[]> {
    return this._getAllTechnology.getAllWithoutPagination().pipe(
      map((capacities) => {
        return capacities.length > 0 ? capacities : [{name: MessageCapacity.CAPACITIES_EMPTY}];
      })
    );
  }

  private createDataCapacity(): void {

    this.getCapacities().subscribe((content) => {

      this.dataAddCapacity = {
        content: content,
        placeholder: MessageCapacity.PLACEHOLDER_CAPACITIES,
        label: MessageCapacity.LABEL_CAPACITIES,
        fieldArrayModel: MessageCapacity.FIELD_ARRAY_CAPACITY,
        validationMessage: ValidationMessageBootcamp['VALIDATION_CAPACITIES'],
        customizedValidation: (selectCapacities: CapacityBasic[]) => {
          return selectCapacities.length >= this._DEFAULT_MIN_NUMBER_CAPACITIES  &&
                selectCapacities.length <= this._DEFAULT_MAX_NUMBER_CAPACITIES;
        }
      }
    });
  }

}
