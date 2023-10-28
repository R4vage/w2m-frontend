import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperheroesComponent } from './superheroes.component';
import { SuperheroesRoutingModule } from './superheroes-routing.module';
import { MatCardModule } from '@angular/material/card';
import { PaginatorComponent } from '../shared/components/paginator/paginator.component';
import { SearchBarComponent } from '../shared/components/search-bar/search-bar.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { SuperheroesService } from './superheroes.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import * as fromSuperhero from './store/superhero.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SuperheroEffects } from './store/superhero.effects';

const MATERIAL_MODULES = [MatCardModule];

@NgModule({
  declarations: [SuperheroesComponent, HeroCardComponent],
  imports: [
    CommonModule,
    SuperheroesRoutingModule,
    PaginatorComponent,
    SearchBarComponent,
    HttpClientModule,
    StoreModule.forFeature(
      fromSuperhero.superheroesFeatureKey,
      fromSuperhero.reducer
    ),
    EffectsModule.forFeature([SuperheroEffects]),
    ...MATERIAL_MODULES,
  ],
  providers: [SuperheroesService],
})
export class SuperheroesModule {}
