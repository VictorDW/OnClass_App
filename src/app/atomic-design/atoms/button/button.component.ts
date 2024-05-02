import { Component, OnInit, Input } from '@angular/core';
import { buttonStructure } from 'src/app/atomic-design/atoms/button/util/buttonStructure';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {

  @Input() itemButton!: buttonStructure;

  constructor() { }

  ngOnInit(): void {
  }

}
