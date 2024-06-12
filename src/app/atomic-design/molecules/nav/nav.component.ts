import { Component } from '@angular/core';
import { navStructure } from 'src/app/atomic-design/molecules/nav/utils/NavStructure';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { PathImages } from 'src/app/util/path.images'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {

  pathImg = PathImages.LOGO
  navItems: navStructure[];

  constructor(private _authService: AuthService) {

    this.navItems = [
      {
        _href: '/dashboard/home',
        _link: {
          _title: 'Inicio',
          _icon: './../../../../assets/svg/home.svg'
          
        }
      },
      {
        _href: '/dashboard/library',
        _link: {
          _title: 'Biblioteca',
          _icon: './../../../../assets/svg/library.svg'
        }
      }
    ]
   }

   isValidAuthentication(item: navStructure): boolean {
    return (this._authService.isAuthenticated() && this._authService.getUserRole() === 'ADMIN') || item._link._title !== 'Biblioteca';
   }

}
