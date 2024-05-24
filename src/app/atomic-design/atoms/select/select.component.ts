import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';


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

  selectedOption!: string;
  selectedValue!: number | string;
  display: boolean = false;
  

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.selectedOption = this.options[0].name;
    this.selectedValue = this.options[0].value;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.displayOptions();
    }
  }

  displayOptions(): void {
    this.display = !this.display;
  }

  onSelectOption({name, value}: OptionSelect): void {
    this.selectedOption = name;
    this.selectedValue = value;
    console.log(value);
  }


}
