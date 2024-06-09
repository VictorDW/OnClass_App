import { Component, EventEmitter, Input, Output} from '@angular/core';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { StyleButton } from 'src/app/shared/constants/constants';

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
    this.itemButton = StyleButton.SUSSESS;
  }

  OncloseModal(): void {
    this.closeModal.emit();
  }


}
