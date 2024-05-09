import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputContentStructure } from 'src/app/atomic-design/organisms/form/util/InputContentStructure';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { FormGroup } from '@angular/forms';
import { ValidationForm } from '../../../shared/service/interface/IValidationService';

type valuesStructure = {
  [key: string]: string
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  @Input() titleForm: string = '';
  @Input() dataInputContent!: InputContentStructure[];
  @Input() validationService!: ValidationForm;
  @Output() closeForm = new EventEmitter<void>();

  form: FormGroup = new FormGroup({});
  itemButton!: buttonStructure;

  constructor() {
    this.fillContentButton()
  }

  ngOnInit(): void {
    this.form = this.validationService.addValidations();
  }

  fillContentButton(): void {
    this.itemButton = {
      showIcon: true,
      icon: 'fa-solid fa-plus',
      text: 'Crear'
    };
  }

  OnCloseForm(): void {
    this.closeForm.emit();
  }

  OnsubmitForm(): void {
    if (this.form.valid) {

      let values: valuesStructure = {};

     for (let control in this.form.controls) {
       values[control] = this.form.get(control)?.value;
     }
     console.log(values);

    } else {
      console.log("no deja pasar las validaciones");
    }
  }

  verifyError(controlInput: string) {
    return this.form.get(controlInput)?.invalid && this.form.get(controlInput)?.dirty;
  }

}
