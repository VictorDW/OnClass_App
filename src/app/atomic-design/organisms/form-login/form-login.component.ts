import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputContentStructure } from '../form/util/InputContentStructure';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { MESSAGES_ALERT, StyleButton } from 'src/app/shared/constants/constants';
import { ValidationForm } from 'src/app/shared/service/interface/validation';
import { Subscription } from 'rxjs';
import { AuthUseCaseService } from 'src/app/domain/usecase/auth/auth-use-case.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/service/observables/alert.service';

type ObjectAuthStructure = {
  email: string;
  password: string;
}

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit, OnDestroy {

  @Input() titleForm: string = '';
  @Input() dataInputContent!: InputContentStructure[];
  @Output() closeForm = new EventEmitter<void>();

  private _loginServiceSubcription!: Subscription;

  form: FormGroup = new FormGroup({});
  itemButton: buttonStructure;

  constructor(private _validationService: ValidationForm,
    private _loginService: AuthUseCaseService,
    private _router: Router,
    private _alertService: AlertService) {

    this.itemButton = StyleButton.LOGIN;
  }


  ngOnInit(): void {
    this.form = this._validationService.addValidations();
  }

  get validationService(): ValidationForm {
    return this._validationService;
  }

  onCloseForm(): void {
    this.closeForm.emit();
  }

  verifyError(controlInput: string) {
    return this.form.get(controlInput)?.invalid && this.form.get(controlInput)?.dirty;
  }

  disableButton(): boolean {
    return this.form.invalid;
  }

  onSubmitForm(): void {

    if (this.form.valid) {
          this._loginServiceSubcription = this._loginService.login(this.MapperValuesToModel())
            .subscribe(() => {
              this.form.reset();
              this._alertService.showAlert(MESSAGES_ALERT.SUCCESS, "success");
              this._router.navigate(['/dashboard']);
            });
    }
  }

  MapperValuesToModel(): ObjectAuthStructure {

    const properties = Object.keys(this.form.controls);

    let model = properties.reduce((model, property: string) => {

      const properyCast = property as keyof ObjectAuthStructure;
      model[properyCast] = this.form.get(property)?.value;
      return model;

    }, {} as ObjectAuthStructure);

    return model;
  }

  ngOnDestroy(): void {
    this._loginServiceSubcription.unsubscribe();
  }
}
