import { Component, OnInit } from '@angular/core';
import { tabsStructure } from './util/TabsStructure';

@Component({
  selector: 'app-tabs-nav',
  templateUrl: './tabs-nav.component.html',
  styleUrls: ['./tabs-nav.component.scss']
})
export class TabsNavComponent implements OnInit {

  tabs: tabsStructure[] = [];

  constructor() {
    this.tabs =[{
      _href:'/library/technology',
      _link: {
        _title: 'Technology'
      } 
    },{
      _href:'/library/capacity',
      _link: {
        _title: 'Capacity'
      }
      
    },{
      _href:'/bootcamp',
      _link: {
        _title: 'Bootcamp'
      } 
    }];
   }

  ngOnInit(): void {
  }

}
