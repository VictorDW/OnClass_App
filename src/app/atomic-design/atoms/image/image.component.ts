import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})

export class ImageComponent implements OnInit {


  @Input() classImg: typeClass = '';
  @Input() pathImg = '';

  constructor() { }

  ngOnInit(): void {
  }
}

export type typeClass = 'logo__nav' | 'img_header' |'';
