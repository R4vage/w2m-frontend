import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Superhero } from '../store/superhero.model';

@Component({
  selector: 'app-hero-card',
  template: '<h1>Mocked Hero Card</h1>'
})
export class HeroCardComponentMock {
  @Input() superhero!: Superhero;
  @Output() editSuperhero: EventEmitter<string> = new EventEmitter();
  @Output() deleteSuperhero: EventEmitter<string> = new EventEmitter();
}
