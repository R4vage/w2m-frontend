import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  template: '<h1>Mocked Search Bar</h1>',
})
export class SearchBarComponentMock {
  @Output() inputEventEmitter = new EventEmitter<string>();
}
