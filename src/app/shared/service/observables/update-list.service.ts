import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateListServerService {

  private _updateList = new Subject<void>();

  updateList$ = this._updateList.asObservable();

  update(): void {
    this._updateList.next();
  }
}
