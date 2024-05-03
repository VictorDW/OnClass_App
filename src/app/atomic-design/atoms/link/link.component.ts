import { Component, Input,OnInit } from '@angular/core';
import { linkStructure } from './util/LinkStructure';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  @Input() itemNav!: linkStructure;
  @Input() classLink!: string;
  @Input() classIcon!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
