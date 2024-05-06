import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputContentStructure } from 'src/app/atomic-design/organisms/form/util/InputContentStructure';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  @Input() titleForm: string = '';
  @Input() dataInputContent!: InputContentStructure[];
  @Input() formReference!: FormGroup;
  @Output() closeForm = new EventEmitter<void>();

  form: FormGroup = new FormGroup({});

  messageAlert: string = '';
  messageError: string = '';
  itemButton: buttonStructure;

  constructor() {

    this.itemButton = {
      _showIcon: false,
      _text: 'Crear'
    }
   }

  ngOnInit(): void {
    this.form = this.formReference;
  }

  OnCloseForm(): void {
    this.closeForm.emit();
  }

  OnsubmitForm(): void {
    if (this.form.valid) {
      console.log("nmae: " + this.form.get('name')?.value);
      console.log("description: " + this.form.get('description')?.value);
    } else {
      if(this.form.get('name')?.hasError('required')){
        console.log("Nombre es obligatorio");
      }else if(this.form.get('name')?.hasError('maxlength')){
        console.log("El nombre debe ser menor a 50 caracteres");
      }
    }
  }

  verifyError(controlInput: string) {
    return this.form.get(controlInput)?.invalid && this.form.get(controlInput)?.dirty;
  }

}
