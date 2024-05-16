import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputContentStructure } from 'src/app/atomic-design/organisms/form/util/InputContentStructure';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { FormGroup } from '@angular/forms';
import { ValidationForm } from '../../../shared/service/interface/validation';
import {ServiceForm} from "../../../domain/interface/api-service";
import { AlertService } from 'src/app/shared/service/alert.service';
import { ResponseMessages } from 'src/app/shared/constants/constants';

type ObjectModelStructure = {
  [key: string]: string
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  @Input() titleForm: string = '';
  @Input() titleModal: string = '';
  @Input() dataInputContent!: InputContentStructure[];
  @Output() closeForm = new EventEmitter<void>();

  form: FormGroup = new FormGroup({});
  itemButton!: buttonStructure;
  isShowModalCreate: boolean = false;

  constructor(private _validationService: ValidationForm, 
    private _service: ServiceForm, 
    private _alertService: AlertService) {
      
    this.fillContentButton()
  }

  ngOnInit(): void {
    this.form = this._validationService.addValidations();
  }

  get validationService() {
    return this._validationService
  }

  get showModelCreate() {
    return this.isShowModalCreate;
  }

  fillContentButton(): void {
    this.itemButton = {
      showIcon: true,
      icon: 'fa-solid fa-plus',
      text: 'Crear'
    };
  }

  onCloseForm(): void {
    this.closeForm.emit();
  }

  onCloseModals(): void {
    this.changeStatusModalCreate();
    this.onCloseForm();
  }

  changeStatusModalCreate(): void {
    this.isShowModalCreate = !this.isShowModalCreate;
  }

  onSubmitForm(): void {

    if (this.form.valid) {
          this._service.register(this.MapperValuesToModel())
            .subscribe(() => 
              this.changeStatusModalCreate());
          this.form.reset();
    } else {
      this._alertService.showAlert(ResponseMessages.INVALID_FORM)
    }
  }

  disableButton(): boolean {
    //return !this.form.dirty;
    return this.form.invalid;
  }

  MapperValuesToModel(): ObjectModelStructure {

    const properties = Object.keys(this.form.controls);

    return properties.reduce((model: ObjectModelStructure, property: string): ObjectModelStructure => {
      model[property] = this.form.get(property)?.value;
      return  model
    }, {})
  }

  verifyError(controlInput: string) {
    return this.form.get(controlInput)?.invalid && this.form.get(controlInput)?.dirty;
  }

}
