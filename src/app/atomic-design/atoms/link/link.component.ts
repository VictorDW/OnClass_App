import { Component, Input,OnInit } from '@angular/core';
import { navStructure } from 'src/app/model/constants';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  @Input() itemNav!: navStructure;

  constructor() { }

  ngOnInit(): void {
  }

}
