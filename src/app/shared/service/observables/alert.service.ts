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

  private DEFAULT_MESSAGE = 'error';
  private DEFAULT_TIME = 3000;

  showAlert(message: string, type?: string, time?: number) {

    time = time ?? this.DEFAULT_TIME;
    type = type ?? this.DEFAULT_MESSAGE;

    this.alertSource.next({message, time, type});
  }
}
