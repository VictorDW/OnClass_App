import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  @Input() titleForm: string = '';
  @Output() closeForm = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  OnCloseForm(): void {
    console.log('close form');
    this.closeForm.emit();
  }

}
