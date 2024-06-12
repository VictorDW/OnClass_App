import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type Alert = {
  message: string,
  time: number,
  type: string
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertSource = new Subject<Alert>();
  alert$ = this.alertSource.asObservable();

  showAlert(message: string, type: string = 'error', time: number = 3000) {
    this.alertSource.next({message, time, type});
  }
}
