import { Injectable } from '@angular/core';
import { ValidationForm } from '../../interface/validation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pattern, ValidationMessageAuth } from 'src/app/shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ValidationAuthService implements ValidationForm {

  private _validations: string[]

  constructor() {
    this._validations = ['required', 'maxlength', 'minlength', 'pattern', 'email'];
  }

  fillControls() {
    return {
      email: new FormControl('',
          [Validators.required,
          Validators.email]),
      password: new FormControl('',
          [Validators.required,
          Validators.maxLength(20),
          Validators.minLength(4),
          Validators.pattern(Pattern.PASSWORD)])
    }
  }
  addValidations(): FormGroup {
    return new FormGroup(this.fillControls());
  }

  getErrorMessage(fieldName: string, form: FormGroup): string {

    const error = this._validations.find(validation => {
      return form?.get(fieldName)?.hasError(validation);
    });

    const selectionMessage = `${fieldName.toUpperCase()}_${error?.toUpperCase()}`;
    const key = selectionMessage as keyof typeof ValidationMessageAuth;

    return error != undefined ? ValidationMessageAuth[key] : '';
  }
}
