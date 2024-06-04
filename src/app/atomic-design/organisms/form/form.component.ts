import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { InputContentStructure } from 'src/app/atomic-design/organisms/form/util/InputContentStructure';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';
import { FormGroup } from '@angular/forms';
import { ValidationForm } from '../../../shared/service/interface/validation';
import {ServiceForm} from "../../../domain/interface/api-service";
import { UpdateListServerService } from 'src/app/shared/service/observables/update-list.service';
import { Subscription } from 'rxjs';
import { dataModel } from '../../pages/capacity/capacity.component';

type ObjectModelStructure = {
  [key: string]: string
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


  constructor(private _validationService: ValidationForm, private _service: ServiceForm, private _updateList: UpdateListServerService) {
    this._serviveSubcription = new Subscription();
    this.fillContentButton()
  }

  ngOnInit(): void {
    this.form = this._validationService.addValidations();
    console.log(this.dataAddModel.content)
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

    return properties.reduce((model: ObjectModelStructure, property: string): ObjectModelStructure => {
      model[property] = this.form.get(property)?.value;
      return  model
    }, {})
  }

  verifyError(controlInput: string) {
    return this.form.get(controlInput)?.invalid && this.form.get(controlInput)?.dirty;
  }

  ngOnDestroy(): void {
      this._serviveSubcription.unsubscribe();
  }

}
