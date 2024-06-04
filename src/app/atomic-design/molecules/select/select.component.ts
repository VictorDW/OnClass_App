import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

type typeSelect = number | string;

export type OptionSelect<T extends typeSelect> = {
  value: T,
  name: string
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit{

  @Input() options!: OptionSelect<typeSelect>[];
  @Output() valueOptionSelected = new EventEmitter<typeSelect>();

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

  onSelectOption({name, value}: OptionSelect<typeSelect>): void {
    this.selectedOption = name;
    this.emitValue(value);
  }

  emitValue(selectedValue: typeSelect): void {
    this.valueOptionSelected.emit(selectedValue);
  }

  textOptionSelect() {
    return `${typeof this.options[0].value === 'string' ? 'por ' : ''}${this.selectedOption}`;
  }
}
