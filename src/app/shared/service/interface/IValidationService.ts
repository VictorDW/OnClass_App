import { FormGroup } from "@angular/forms";

export interface ValidationForm {
  addValidations(): FormGroup
  getErrorMessage(fieldName: string, form: FormGroup): string
}
