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
      _href:'technology',
      _link: {
        _title: 'Tecnologías'
      }
    },{
      _href:'capacity',
      _link: {
        _title: 'Capacidades'
      }

    },{
      _href:'bootcamp',
      _link: {
        _title: 'Bootcamps'
      }
    }];
   }

}
