import { Component} from '@angular/core';
import { tabsStructure } from './util/TabsStructure';

@Component({
  selector: 'app-tabs-nav',
  templateUrl: './tabs-nav.component.html',
  styleUrls: ['./tabs-nav.component.scss']
})
export class TabsNavComponent {

  tabs: tabsStructure[] = [];

  constructor() {
    this.tabs =[{
      _href:'/library/technology',
      _link: {
        _title: 'Tecnologías'
      }
    },{
      _href:'/library/capacity',
      _link: {
        _title: 'Capacidades'
      }

    },{
      _href:'/library/bootcamp',
      _link: {
        _title: 'Bootcamps'
      }
    }];
   }

}
