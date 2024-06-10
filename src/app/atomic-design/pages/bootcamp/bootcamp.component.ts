import { Component } from '@angular/core';
import { Models, ResponseMessages, StyleButton, ValidationMessageBootcamp} from 'src/app/shared/constants/constants';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { InputContentStructure } from '../../organisms/form/util/InputContentStructure';
import { dataModel } from '../capacity/capacity.component';
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

  displayContainerAddCapacity = true;
  private _isShowFrom = false;

  dataButton: buttonStructure;
  dataInputContent!: InputContentStructure[];
  dataAddCapacity!: dataModel;
  messageCreateModel: string = ResponseMessages.CREATE_MODEL.replace('{model}', `un ${Models.BOOTCAMP}`);
  titleForm: string =  ResponseMessages.CREATE_MODEL.replace('{model}', Models.BOOTCAMP);
  titleModal: string = ResponseMessages.SUSSESS_MODEL.replace('{model}', Models.BOOTCAMP);
  private _DEFAULT_MIN_NUMBER_CAPACITIES = 1;
  private _DEFAULT_MAX_NUMBER_CAPACITIES = 4;

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
        return capacities.length > 0 ? capacities : [{name: 'No se encuentran capacidades registradas'}];
      })
    );
  }

  private createDataCapacity(): void {

    this.getCapacities().subscribe((content) => {

      this.dataAddCapacity = {
        content: content,
        placeholder: 'Seleccione las capacidades',
        label: 'Capacidades',
        arrayModel: 'capacities',
        validationMessage: ValidationMessageBootcamp['VALIDATION_CAPACITIES'],
        validation: (selectCapacities: CapacityBasic[]) => {
          return selectCapacities.length >= this._DEFAULT_MIN_NUMBER_CAPACITIES  &&
                selectCapacities.length <= this._DEFAULT_MAX_NUMBER_CAPACITIES;
        }
      }
    });
  }

}
