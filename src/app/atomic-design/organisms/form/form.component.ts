import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputContentStructure } from 'src/app/atomic-design/organisms/form/util/InputContentStructure';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { FormGroup } from '@angular/forms';
import { ValidationForm } from '../../../service/interface/IValidationService';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  @Input() titleForm: string = '';
  @Input() dataInputContent!: InputContentStructure[];
  @Input() formReference!: FormGroup;
  @Input() validationService!: ValidationForm;
  @Output() closeForm = new EventEmitter<void>();

  form: FormGroup = new FormGroup({});
  itemButton!: buttonStructure;

  constructor() {
    this.fillContentButton()
  }

  ngOnInit(): void {
    this.form = this.formReference;
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

  OnsubmitForm(): void {//TODO omitelo son pruebas
    if (this.form.valid) {
      console.log("nmae: " + this.form.get('name')?.value);
      console.log("description: " + this.form.get('description')?.value);
    } else {
      console.log("no deja pasar las validaciones");
    }
  }

  verifyError(controlInput: string) {
    return this.form.get(controlInput)?.invalid && this.form.get(controlInput)?.dirty;
  }

}
