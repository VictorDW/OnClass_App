import { Component } from '@angular/core';
import { navStructure } from 'src/app/atomic-design/molecules/nav/utils/NavStructure';
import { PathImages } from 'src/app/util/path.images'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {

  pathImg = PathImages.LOGO
  navItems: navStructure[];

  constructor() {

    this.navItems = [
      {
        _href: '/home',
        _title: 'Inicio',
        _icon: 'fa-solid fa-house'
      },
      {
        _href: '#',
        _title: 'Biblioteca',
        _icon: 'fa-solid fa-book-open'
      }
    ]
   }

}
