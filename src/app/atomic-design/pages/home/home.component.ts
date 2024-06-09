import { Component } from '@angular/core';
import { buttonStructure } from 'src/app/atomic-design/atoms/button/util/buttonStructure';
import { StyleButton } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {


  dataButton: buttonStructure;;

  constructor() {
    this.dataButton = StyleButton.CREATE;
   }


}
