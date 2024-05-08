import { Component} from '@angular/core';
import { buttonStructure } from 'src/app/atomic-design/atoms/button/util/buttonStructure';
import { InputContentStructure } from '../form/util/InputContentStructure';
import { ValidationsTechnologyService } from 'src/app/service/technology/validations-technology.service';

@Component({
  selector: 'app-content-technology',
  templateUrl: './content-technology.component.html',
  styleUrls: ['./content-technology.component.scss']
})

export class ContentTechnologyComponent {

  private _isShowContent = false;
  private _isShowFrom = false;
  dataButton!: buttonStructure
  dataInputContent!: InputContentStructure[]
  titleForm: string = 'Crear tecnología';

  constructor(private validationService: ValidationsTechnologyService) {
      this.fillContentInput();
      this.fillContentButton()
   }

  get validationsService(): ValidationsTechnologyService {
    return this.validationService;
  }

  showContent(): boolean {
    return this._isShowContent;
  }

  changeStateFrom(): void {
    this._isShowFrom = !this._isShowFrom;
  }

  showFrom(): Boolean {
   return this._isShowFrom;
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
