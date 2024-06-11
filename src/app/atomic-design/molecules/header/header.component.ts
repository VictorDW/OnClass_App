import { Component } from '@angular/core';
import { PathImages } from 'src/app/util/path.images'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  pathImg = PathImages.IMG_USER;

}
