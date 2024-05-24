import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';


type OptionSelect = {
  value: number | string, 
  name: string
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit{

  @Input() options!: OptionSelect[];
  @Output() valueOptionSelected = new EventEmitter<number | string>();

  selectedOption!: string;
  display: boolean = false;
  
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.selectedOption = this.options[0].name;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.display = false;
    }
  }

  displayOptions(): void {
    this.display = !this.display;
  }

  onSelectOption({name, value}: OptionSelect): void {
    this.selectedOption = name;
    this.emitValue(value);
  }

  emitValue(selectedValue: number | string): void {
    this.valueOptionSelected.emit(selectedValue);
  }
}
