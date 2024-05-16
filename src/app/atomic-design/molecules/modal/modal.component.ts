import { Component, EventEmitter, Input, Output} from '@angular/core';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() titleModal: string = '';
  @Output() closeModal = new EventEmitter<void>();

  itemButton!: buttonStructure;

  constructor() { 
    this.fillContentButton();
  }
  
  fillContentButton(): void {
    this.itemButton = {
      showIcon: false,
      text: 'Aceptar'
    };
  }

  OncloseModal(): void {
    this.closeModal.emit();
  }


}
