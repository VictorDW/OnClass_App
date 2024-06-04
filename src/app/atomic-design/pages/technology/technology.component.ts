import { Component, OnDestroy } from '@angular/core';
import { buttonStructure } from 'src/app/atomic-design/atoms/button/util/buttonStructure';
import { InputContentStructure } from '../../organisms/form/util/InputContentStructure';
import { ValidationTechnologyService } from 'src/app/shared/service/validations/validation-technology.service';
import { TechnologyUseCaseService } from "../../../domain/usecase/technology-use-case.service";
import { ValidationForm } from "../../../shared/service/interface/validation";
import { GetService, ServiceForm } from "../../../domain/interface/api-service";
import { ResponseMessages, Models } from "../../../shared/constants/constants";
import { UpdateListServerService } from 'src/app/shared/service/observables/update-list.service';
import { Subscription } from 'rxjs';


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

export class ContentTechnologyComponent implements OnDestroy {

  displayContentList = true;
  private _isShowFrom = false; 

  dataButton!: buttonStructure
  dataInputContent!: InputContentStructure[]
  titleForm: string =  ResponseMessages.CREATE_MODEL.replace('{model}', Models.TECHNOLOGY);
  titleModal: string = ResponseMessages.SUSSESS_MODEL.replace('{model}', Models.TECHNOLOGY);
  private _updateListSubscription!: Subscription;


  constructor(private _updateList: UpdateListServerService) {
      this.fillContentInput();
      this.fillContentButton();
      this.updateListModels(); 
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

  private fillContentButton(): void {
    this.dataButton = {
      showIcon: true,
      icon: 'fa-solid fa-plus',
      text: 'Crear'
    };
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

  updateListModels() {
    this._updateListSubscription = this._updateList.updateList$.subscribe(() => {
      if(!this.displayContentList) {
        this.changeVisibilityModelList(true);
      } 
    })
  }

  ngOnDestroy(): void {
    this,this._updateListSubscription.unsubscribe();
  }


}
