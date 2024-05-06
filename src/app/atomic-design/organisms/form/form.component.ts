import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputContentStructure } from 'src/app/atomic-design/organisms/form/util/InputContentStructure';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  @Input() titleForm: string = '';
  @Input() dataInputContent!: InputContentStructure[];
  @Output() closeForm = new EventEmitter<void>();

  itemButton: buttonStructure;

  constructor() {

    this.itemButton = {
      _showIcon: false,
      _text: 'Crear'
    }

   }

  ngOnInit(): void {
  }

  OnCloseForm(): void {
    console.log('close form');
    this.closeForm.emit();
  }

}
