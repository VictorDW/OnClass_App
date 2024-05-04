import { Component, OnInit } from '@angular/core';
import { buttonStructure } from 'src/app/atomic-design/atoms/button/util/buttonStructure';

@Component({
  selector: 'app-content-technology',
  templateUrl: './content-technology.component.html',
  styleUrls: ['./content-technology.component.scss']
})

export class ContentTechnologyComponent {

  private isShow = false;
  private dataButton!: buttonStructure

  constructor() {
    this.dataButton = {
      _showIcon: true,
      _icon: 'fa-solid fa-plus',
      _text: 'Crear'
      };
    
   }

  showContent(): boolean {
    return this.isShow;
  }

  itemButton(): buttonStructure {
    return this.dataButton;
  }

}
