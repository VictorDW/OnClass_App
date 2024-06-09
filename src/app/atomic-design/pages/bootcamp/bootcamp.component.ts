import { Component, OnInit } from '@angular/core';
import { Models, ResponseMessages, StyleButton } from 'src/app/shared/constants/constants';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';

@Component({
  selector: 'app-bootcamp',
  templateUrl: './bootcamp.component.html',
  styleUrls: ['./bootcamp.component.scss']
})
export class BootcampComponent implements OnInit {

  dataButton: buttonStructure;
  messageCreateModel: string = ResponseMessages.CREATE_MODEL.replace('{model}', `un ${Models.BOOTCAMP}`);

  constructor() {
    this.dataButton = StyleButton.CREATE;
  }

  ngOnInit(): void {
  }

}
