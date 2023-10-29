import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Superhero } from '../../store/superhero.model';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
})
export class HeroCardComponent {
  @Input() superhero!: Superhero;
  @Output() editSuperhero: EventEmitter<string> = new EventEmitter();
  @Output() deleteSuperhero: EventEmitter<string> = new EventEmitter();

  edit(id: string) {
    this.editSuperhero.emit(id);
  }

  delete(id: string) {
    this.deleteSuperhero.emit(id);
  }
}
