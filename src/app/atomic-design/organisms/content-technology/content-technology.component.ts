import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-technology',
  templateUrl: './content-technology.component.html',
  styleUrls: ['./content-technology.component.scss']
})
export class ContentTechnologyComponent implements OnInit {

  private isShow = false;

  constructor() { }

  ngOnInit(): void {
  }

  showContent(): boolean {
    return this.isShow;
  }

}
