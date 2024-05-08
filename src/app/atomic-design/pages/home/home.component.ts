import { Component, OnInit } from '@angular/core';
import { buttonStructure } from 'src/app/atomic-design/atoms/button/util/buttonStructure';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {


 dataButton: buttonStructure = {
  showIcon: true,
  icon: 'fa-solid fa-plus',
  text: 'Crear'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
