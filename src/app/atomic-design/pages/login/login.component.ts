import { Component, OnInit } from '@angular/core';
import { PathImages } from 'src/app/util/path.images';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pathImg = PathImages.LOGO

  constructor() { }

  ngOnInit(): void {
  }

}
