import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/service/observables/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  showAlert = false;
  animationTime!: number
  message = '';

  constructor(private _alertService: AlertService) { }

  ngOnInit(): void {
    this.show();
  }

  show() {
    this._alertService.alert$.subscribe((alert) => {
      this.changeStatus();
      this.message = alert.message;
      this.animationTime = this.mlToSecunds(alert.time);
      this.closeAlert(alert.time);
    })
  }

  mlToSecunds(time: number) {
    return time / 1000
  }

  changeStatus() {
    this.showAlert = !this.showAlert;
  }


  closeAlert(time: number) {
    setTimeout(() => {
      this.changeStatus();
    }, time);
  }

  get alertStyle() {
    return {
      animation: `slideDown ${this.animationTime}s ease-in-out`
    }
  }

}
