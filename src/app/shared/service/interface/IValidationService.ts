import { FormGroup } from "@angular/forms";

export interface ValidationForm {
  getErrorMessage(fieldName: string, form: FormGroup): string
}
