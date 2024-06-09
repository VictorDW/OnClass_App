import { Component, Input, OnInit } from '@angular/core';
import { buttonStructure } from '../../atoms/button/util/buttonStructure';

@Component({
  selector: 'app-list-bootcamps',
  templateUrl: './list-bootcamps.component.html',
  styleUrls: ['./list-bootcamps.component.scss']
})
export class ListBootcampsComponent implements OnInit {

  @Input()  dataButton!: buttonStructure;
  @Input() messageCreateModel!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
