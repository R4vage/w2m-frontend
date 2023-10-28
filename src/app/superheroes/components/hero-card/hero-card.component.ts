import { Component, Input } from '@angular/core';
import { Superhero } from '../../store/superhero.model';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent {
  @Input() superhero!:Superhero;

}
