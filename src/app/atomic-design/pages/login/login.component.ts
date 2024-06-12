import { Component, OnInit } from '@angular/core';
import { PathImages } from 'src/app/util/path.images';
import { InputContentStructure } from '../../organisms/form/util/InputContentStructure';
import { ResponseMessages } from 'src/app/shared/constants/constants';
import { ValidationForm } from 'src/app/shared/service/interface/validation';
import { ValidationAuthService } from 'src/app/shared/service/validations/auth/validation-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [{provide: ValidationForm, useClass: ValidationAuthService}]
})
export class LoginComponent implements OnInit {

  private _isShowFrom = false;

  pathImg = PathImages.LOGO
  titleForm: string =  ResponseMessages.LOGIN;
  dataInputContent!: InputContentStructure[];

  constructor() {
    this.fillContentInput();
   }

  ngOnInit(): void {
  }

  get showFrom() {
    return this._isShowFrom;
  }

  private fillContentInput(): void {
    this.dataInputContent = [
       {
         label: 'Email',
         placeholder: 'Digite su correo',
         controle: 'email',
         type: 'text'
       },{
         label: 'Password',
         placeholder: 'Digite su contraseña',
         controle: 'password',
         type: 'password'
       }
     ]
  }

  changeStateFrom(): void {
    this._isShowFrom = !this._isShowFrom;
  }

}
