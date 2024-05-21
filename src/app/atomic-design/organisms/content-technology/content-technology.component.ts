import { Component} from '@angular/core';
import { buttonStructure } from 'src/app/atomic-design/atoms/button/util/buttonStructure';
import { InputContentStructure } from '../form/util/InputContentStructure';
import { ValidationTechnologyService } from 'src/app/shared/service/validations/validation-technology.service';
import {TechnologyUseCaseService} from "../../../domain/usecase/technology-use-case.service";
import {ValidationForm} from "../../../shared/service/interface/validation";
import {GetService, ServiceForm} from "../../../domain/interface/api-service";
import {ResponseMessages, Models} from "../../../shared/constants/constants";
import { Technology } from 'src/app/domain/models/technology';
import { BehaviorSubject, switchMap } from 'rxjs';


@Component({
  selector: 'app-content-technology',
  templateUrl: './content-technology.component.html',
  styleUrls: ['./content-technology.component.scss'],
  providers: [
    {provide: ValidationForm, useClass: ValidationTechnologyService},
    {provide: ServiceForm, useClass: TechnologyUseCaseService},
    {provide: GetService, useClass: TechnologyUseCaseService}
  ]
})

export class ContentTechnologyComponent {

  selectedValue = 2;
  displayContentList = true;
  private _isShowFrom = false; 
  //private _techSubject = new BehaviorSubject<number>(this.selectedValue);


  dataButton!: buttonStructure
  dataInputContent!: InputContentStructure[]
  titleForm: string =  ResponseMessages.CREATE_MODEL.replace('{model}', Models.TECHNOLOGY);
  titleModal: string = ResponseMessages.SUSSESS_MODEL.replace('{model}', Models.TECHNOLOGY);


  /*technologies: Technology[] = [];
  techs$ = this._techSubject.asObservable().pipe(
    switchMap((num) => this.getService.getAll({size: num}))
  )*/

  constructor() {
      this.fillContentInput();
      this.fillContentButton()
      
  }

  get showFrom() {
    return this._isShowFrom;
  }

  changeStateFrom(): void {
    this._isShowFrom = !this._isShowFrom;
  }

  changeVisibilityModelList(status: boolean): void {
    this.displayContentList = status;
  }

  fillContentButton(): void {
    this.dataButton = {
      showIcon: true,
      icon: 'fa-solid fa-plus',
      text: 'Crear'
    };
  }

  fillContentInput(): void {

   this.dataInputContent = [
      {
        label: 'Nombre',
        placeholder: 'Nombre de la tecnología',
        controle: 'name'
      },{
        label: 'Descripción',
        placeholder: 'Descripción de la tecnología',
        controle: 'description'
      }
    ]
  }


}
