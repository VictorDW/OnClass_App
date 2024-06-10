import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { InputContentStructure } from 'src/app/atomic-design/organisms/form/util/InputContentStructure';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import {  FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationForm } from '../../../shared/service/interface/validation';
import { ServiceForm } from "../../../domain/interface/api-service";
import { UpdateListServerService } from 'src/app/shared/service/observables/update-list.service';
import { Subscription } from 'rxjs';
import { ModelsApiSelect, StyleButton, dataToAddListModels } from 'src/app/shared/constants/constants';

type ObjectModelStructure = {
  [key: string]: string | ModelsApiSelect[]
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit, OnDestroy {

  @Input() titleForm: string = '';
  @Input() titleModal: string = '';
  @Input() dataInputContent!: InputContentStructure[];
  @Input() displayContainerAddModel: boolean = false
  @Input() dataAddModel!: dataToAddListModels
  @Output() closeForm = new EventEmitter<void>();

  private _serviveSubcription!: Subscription;

  form: FormGroup = new FormGroup({});
  itemButton: buttonStructure;
  isShowModalCreate: boolean = false;
  displaySelect: boolean = false;
  selectModels: ModelsApiSelect[] = [];
  isQuantityModeIsValid: boolean = true
  messageModelInvalid: string = '';


  constructor(private _validationService: ValidationForm,
              private _service: ServiceForm,
              private _updateList: UpdateListServerService) {

    this._serviveSubcription = new Subscription();
    this.itemButton = StyleButton.CREATE;
  }

  ngOnInit(): void {

    this.form = this._validationService.addValidations();

    if(this.dataAddModel !== undefined) {
      this.form.setValidators(this.initialCustomValidationCheck())
    }
  }

  get validationService() {
    return this._validationService
  }

  get showModelCreate() {
    return this.isShowModalCreate;
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

  displaySelectContent(): void {
    this.displaySelect = !this.displaySelect;
  }

  private isNotDefaultSelection(): boolean {
    return this.dataAddModel.content[0].id !== undefined;
  }

  hasModelSelect(): boolean {
    return this.selectModels.length > 0;
  }

  onSelectModel(modelToAdd: ModelsApiSelect): void {

    if(this.isNotDefaultSelection()) {
      this.addModelIfNotExists(modelToAdd);
      this.verifySelectModelStatus();
    }
  }

  private addModelIfNotExists(modelToAdd: ModelsApiSelect): void {

    const modelExists = this.selectModels.some(model => model.name === modelToAdd.name);

    if(!modelExists) {
      this.selectModels.push(modelToAdd);
    }
  }


  onRemoveModel(modelToRemove: ModelsApiSelect): void {

    const selectModelsFiltered = this.selectModels.filter(model => model.name !== modelToRemove.name);

    this.selectModels = selectModelsFiltered;
    this.verifySelectModelStatus();
  }

  private initialCustomValidationCheck(): ValidatorFn {

    return (): ValidationErrors | null => {

      if(!this.dataAddModel.customizedValidation(this.selectModels) && this.form.valid) {
        return {invalid: true};
      }

      return null
    }
  }

  private updateFormValidityStatus(): void {
    this.form.updateValueAndValidity();
  }

  private verifySelectModelStatus(): void {
    this.isQuantityModeIsValid = this.validateModels();
    this.setMessageModelInvalid();
  }

  private validateModels(): boolean {
    const isValid = this.dataAddModel.customizedValidation(this.selectModels);
    this.updateFormValidityStatus();
    return isValid;
  }

  private setMessageModelInvalid(): void {
    this.messageModelInvalid = this.isQuantityModeIsValid ? '' : this.dataAddModel.validationMessage;
  }

  onSubmitForm(): void {

    if (this.form.valid) {
          this._serviveSubcription = this._service.register(this.MapperValuesToModel())
            .subscribe(() => {
              this.changeStatusModalCreate();
              this._updateList.update();
            });
          this.form.reset();
    }
  }

  disableButton(): boolean {
    return this.form.invalid;
  }

  MapperValuesToModel(): ObjectModelStructure {

    const properties = Object.keys(this.form.controls);
    let model = properties.reduce((model: ObjectModelStructure, property: string): ObjectModelStructure => {
      model[property] = this.form.get(property)?.value;
      return  model
    }, {})

    if(this.dataAddModel) {
      model[this.dataAddModel.arrayModel] = this.selectModels;
    }

    return model
  }

  verifyError(controlInput: string) {
    return this.form.get(controlInput)?.invalid && this.form.get(controlInput)?.dirty;
  }

  ngOnDestroy(): void {
      this._serviveSubcription.unsubscribe();
  }

}
