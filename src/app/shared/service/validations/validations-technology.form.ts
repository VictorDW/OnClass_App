import { Injectable } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { ValidationForm } from '../interface/IValidationService';
import {ConstantsPattern, ConstantsValidationMessage} from '../../constants/ConstantsMessage';


@Injectable({
  providedIn: 'root'
})

export class ValidationsTechnologyForm implements ValidationForm {

  private _validations: string[]
  private readonly _validationControls = {};

  constructor(private formBuilder: FormBuilder) {

    this._validations = ['required', 'maxlength', 'minlength', 'pattern'];
    //this._validationControls = this.fillControls();
  }

  fillControls() {
    return {
      name: new FormControl('',
          [Validators.required,
          Validators.maxLength(50),
          Validators.minLength(2),
          Validators.pattern(ConstantsPattern.NAME)]),
      description: new FormControl('',
          [Validators.required,
          Validators.maxLength(90),
          Validators.minLength(10),
          Validators.pattern(ConstantsPattern.DESCRIPTION)])
    }
  }

  addValidations(): FormGroup {
    return new FormGroup(this.fillControls());
  }

  getErrorMessage(fieldName: string, form: FormGroup): string {

    const error = this._validations.find(validation => {
      return form.get(fieldName)?.hasError(validation);
    });

    const messageSelection = fieldName.toUpperCase() + '_' + error?.toUpperCase();
    const key = messageSelection as keyof typeof ConstantsValidationMessage;

    return error ? ConstantsValidationMessage[key] : '';
  }

}

