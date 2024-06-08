import { Injectable } from '@angular/core';
import { ValidationForm } from '../interface/validation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModelsApiSelect, Pattern, ValidationMessageCapacity } from '../../constants/constants';

@Injectable()
export class ValidationCapacityService implements ValidationForm {

  private _validations: string[]

  constructor() {
    this._validations = ['required', 'maxlength', 'minlength', 'pattern'];
  }

  fillControls() {
    return {
      name: new FormControl('',
          [Validators.required,
          Validators.maxLength(50),
          Validators.minLength(7),
          Validators.pattern(Pattern.NAME)]),
      description: new FormControl('',
          [Validators.required,
          Validators.maxLength(90),
          Validators.minLength(10),
          Validators.pattern(Pattern.DESCRIPTION)])
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
      const key = selectionMessage as keyof typeof ValidationMessageCapacity;

      return error != undefined ? ValidationMessageCapacity[key] : '';
  }
}
