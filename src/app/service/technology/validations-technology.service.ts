import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { ValidationForm } from '../interface/IValidationService';
import { ConstantsValidationMessage } from '../../constants/ConstantsMessage';


@Injectable({
  providedIn: 'root'
})

export class ValidationsTechnologyService implements ValidationForm {

  private _validations: string[]
  private readonly _validationControls = {};

  constructor(private formBuilder: FormBuilder) {

    this._validations = ['required', 'maxlength', 'minlength'];
    this._validationControls = this.fillControls();
  }

  fillControls() {
    return {
      name: ['',
          [Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3)]],
      description: ['',
          [Validators.required,
          Validators.maxLength(90)]]
    }
  }

  addValidations(): FormGroup {
    return this.formBuilder.group(this._validationControls);
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

