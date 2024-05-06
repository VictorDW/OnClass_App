import { Component, OnInit} from '@angular/core';
import { buttonStructure } from 'src/app/atomic-design/atoms/button/util/buttonStructure';
import { InputContentStructure } from '../form/util/InputContentStructure';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-content-technology',
  templateUrl: './content-technology.component.html',
  styleUrls: ['./content-technology.component.scss']
})

export class ContentTechnologyComponent {

  private _isShowContent = false;
  private _isShowFrom = false;
  private _dataButton!: buttonStructure
  dataInputContent: InputContentStructure[]
  titleForm: string = 'Crear tecnologia';

  constructor(private formBuilder: FormBuilder) {
    this._dataButton = {
      _showIcon: true,
      _icon: 'fa-solid fa-plus',
      _text: 'Crear'
      };

      this.dataInputContent = [
        {
          label: 'Nombre',
          placeholder: 'Nombre de la tecnologia',
          controle: 'name'
        },{
          label: 'Descripción',
          placeholder: 'Descripción de la tecnologia',
          controle: 'description'
        }
      ]
    
   }
   addValidations(): FormGroup {

    const formReference = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]]
    });

    return formReference;

   }

  showContent(): boolean {
    return this._isShowContent;
  }

  itemButton(): buttonStructure {
    return this._dataButton;
  }
  
  changeStateFrom(): void {
    this._isShowFrom = !this._isShowFrom;
  }

  showFrom(): Boolean {
   return this._isShowFrom;
  }

}
