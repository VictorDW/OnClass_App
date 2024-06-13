import { Component } from '@angular/core';
import { AuthUseCaseService } from 'src/app/domain/usecase/auth/auth-use-case.service';
import { PathImages } from 'src/app/util/path.images'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  pathImg = PathImages.IMG_USER;

  constructor(private _authUsecase: AuthUseCaseService) {}

  onLogout(): void {
    this._authUsecase.logout();
  }

}
