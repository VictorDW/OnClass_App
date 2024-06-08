import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { InputContentStructure } from 'src/app/atomic-design/organisms/form/util/InputContentStructure';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { FormGroup } from '@angular/forms';
import { ValidationForm } from '../../../shared/service/interface/validation';
import {ServiceForm} from "../../../domain/interface/api-service";
import { UpdateListServerService } from 'src/app/shared/service/observables/update-list.service';
import { Subscription } from 'rxjs';
import { dataModel } from '../../pages/capacity/capacity.component';
import { ModelsApiSelect } from 'src/app/shared/constants/constants';

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
  @Input() dataAddModel!: dataModel
  @Output() closeForm = new EventEmitter<void>();

  private _serviveSubcription!: Subscription;

  form: FormGroup = new FormGroup({});
  itemButton!: buttonStructure;
  isShowModalCreate: boolean = false;
  displaySelect: boolean = false;
  placeHolderSelect: string = '';
  selectModels: ModelsApiSelect[] = [];
  isCountModelValid: boolean = true
  messageModelInvalid: string = '';


  constructor(private _validationService: ValidationForm,
              private _service: ServiceForm,
              private _updateList: UpdateListServerService) {

    this._serviveSubcription = new Subscription();
    this.fillContentButton()
  }

  ngOnInit(): void {
    this.form = this._validationService.addValidations();
    this.fillPlaceholderSelect();
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

  fillPlaceholderSelect(): void {
    if(this.dataAddModel) {
      this.placeHolderSelect = this.dataAddModel.placeholder;
    }
  }

  onCloseForm(): void {
    this.fillPlaceholderSelect();
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

  private validateDataContent(): boolean {
    return this.dataAddModel.content[0].id !== undefined;
  }

  hasModelSelect(): boolean {
    return this.selectModels.length > 0;
  }

  onSelectModel(modelToAdd: ModelsApiSelect): void {
    if(this.validateDataContent()) {
      this.placeHolderSelect = modelToAdd.name;
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

  private verifySelectModelStatus(): void {
    this.isCountModelValid = this.validateModels();
    this.setMessageModelInvalid();
  }
  
  private validateModels(): boolean {
    const isValid = this.dataAddModel.validation(this.selectModels);
    this.form.setErrors(isValid ? null : {invalid: true});
    return isValid;
  }
  
  private setMessageModelInvalid(): void {
    this.messageModelInvalid = this.isCountModelValid ? '' : this.dataAddModel.validationMessage;
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
