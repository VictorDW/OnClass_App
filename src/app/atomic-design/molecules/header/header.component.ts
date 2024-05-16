import { Component, OnInit } from '@angular/core';
import { PathImages } from 'src/app/util/path.images'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pathImg = PathImages.IMG_USER;

  constructor() { }

  ngOnInit(): void {
  }

}
