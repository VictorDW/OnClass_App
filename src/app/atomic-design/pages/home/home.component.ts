import { Component, OnInit } from '@angular/core';
import { buttonStructure } from 'src/app/atomic-design/atoms/button/util/buttonStructure';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  
 dataButton: buttonStructure = {
  _showIcon: true,
  _icon: 'fa-solid fa-plus',
  _text: 'Crear'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
