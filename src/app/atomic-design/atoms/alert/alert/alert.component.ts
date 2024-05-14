import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/service/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  showAlert = false;
  message = '';

  constructor(private _alertService: AlertService) { }

  ngOnInit(): void {
    this.show();
  }

  show() {
    this._alertService.alert$.subscribe((alert) => {
      this.changeStatus();
      this.message = alert.message;
      this.closeAlert(alert.time);
    })
  }

  changeStatus() {
    this.showAlert = !this.showAlert;
  }


  closeAlert(time: number) {
    setTimeout(() => {
      this.changeStatus();
    }, time);
  }

}
