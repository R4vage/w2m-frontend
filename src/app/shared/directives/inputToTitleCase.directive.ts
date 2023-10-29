import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[inputTitleCase]',
})
export class InputTitleCaseDirective {
  constructor(private element: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const initialValue = this.element.nativeElement.value;

    this.element.nativeElement.value = this.toTitleCase(initialValue);
    event.preventDefault();
  }

  private toTitleCase(value: string): string {
    return value.replace(/\w\S*/g, (txt) => {
      let strings = txt.toLowerCase().split(' ');
      for (let i = 0; i < strings.length; i++) {
        strings[i] = strings[i].charAt(0).toUpperCase() + strings[i].slice(1);
      }

      return strings.join('');
    });
  }
}
