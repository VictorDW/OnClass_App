import { Component } from '@angular/core';
import { buttonStructure } from 'src/app/atomic-design/atoms/button/util/buttonStructure';
import { InputContentStructure } from '../../organisms/form/util/InputContentStructure';
import { ValidationTechnologyService } from 'src/app/shared/service/validations/validation-technology.service';
import { TechnologyUseCaseService } from "../../../domain/usecase/technology-use-case.service";
import { ValidationForm } from "../../../shared/service/interface/validation";
import { GetService, ServiceForm } from "../../../domain/interface/api-service";
import { ResponseMessages, Models, StyleButton } from "../../../shared/constants/constants";


@Component({
  selector: 'app-content-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss'],
  providers: [
    {provide: ValidationForm, useClass: ValidationTechnologyService},
    {provide: ServiceForm, useClass: TechnologyUseCaseService},
    {provide: GetService, useClass: TechnologyUseCaseService}
  ]
})

export class ContentTechnologyComponent {

  private _isShowFrom = false;

  dataButton!: buttonStructure
  dataInputContent!: InputContentStructure[]
  messageCreateModel: string = ResponseMessages.CREATE_MODEL.replace('{model}', `una ${Models.TECHNOLOGY}`);
  titleForm: string =  ResponseMessages.CREATE_MODEL.replace('{model}', Models.TECHNOLOGY);
  titleModal: string = ResponseMessages.SUSSESS_MODEL.replace('{model}', Models.TECHNOLOGY);


  constructor() {
      this.fillContentInput();
      this.dataButton = StyleButton.CREATE;
  }

  get showFrom() {
    return this._isShowFrom;
  }

  changeStateFrom(): void {
    this._isShowFrom = !this._isShowFrom;
  }

  private fillContentInput(): void {

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
