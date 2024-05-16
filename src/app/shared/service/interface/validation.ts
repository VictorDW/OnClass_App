import { FormGroup } from "@angular/forms";

export abstract class ValidationForm {
  abstract addValidations(): FormGroup
  abstract getErrorMessage(fieldName: string, form: FormGroup): string
}
