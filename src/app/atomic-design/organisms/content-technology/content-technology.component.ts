import { Component, OnInit } from '@angular/core';
import { buttonStructure } from 'src/app/atomic-design/atoms/button/util/buttonStructure';

@Component({
  selector: 'app-content-technology',
  templateUrl: './content-technology.component.html',
  styleUrls: ['./content-technology.component.scss']
})

export class ContentTechnologyComponent {

  private _isShowContent = false;
  private _isShowFrom = false;
  private _dataButton!: buttonStructure
  titleForm: string = 'Crear tecnologia';

  constructor() {
    this._dataButton = {
      _showIcon: true,
      _icon: 'fa-solid fa-plus',
      _text: 'Crear'
      };
    
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
