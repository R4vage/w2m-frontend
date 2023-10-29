import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSuperhero from './store/superhero.reducer';
import { SuperheroEffects } from './store/superhero.effects';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { SuperheroesRoutingModule } from './superheroes-routing.module';
import { SuperheroesService } from './superheroes.service';
import { SuperheroesComponent } from './superheroes.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { SuperheroModalComponent } from './components/superhero-modal/superhero-modal.component';

import { SearchBarComponent } from '../shared/components/search-bar/search-bar.component';
import { InputTitleCaseDirective } from '../shared/directives/inputToTitleCase.directive';
import { PaginatorComponent } from '../shared/components/paginator/paginator.component';

const MATERIAL_MODULES = [
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatInputModule,
];

@NgModule({
  declarations: [
    SuperheroesComponent,
    HeroCardComponent,
    SuperheroModalComponent,
    InputTitleCaseDirective,
  ],
  imports: [
    CommonModule,
    SuperheroesRoutingModule,
    PaginatorComponent,
    SearchBarComponent,
    HttpClientModule,
    ReactiveFormsModule,
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
