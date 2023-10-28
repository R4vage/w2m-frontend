import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperheroesComponent } from './superheroes.component';
import { SuperheroesRoutingModule } from './superheroes-routing.module';
import { MatCardModule } from '@angular/material/card';
import { PaginatorComponent } from '../shared/components/paginator/paginator.component';
import { SearchBarComponent } from '../shared/components/search-bar/search-bar.component';

const MATERIAL_MODULES = [MatCardModule];

@NgModule({
  declarations: [SuperheroesComponent],
  imports: [
    CommonModule,
    SuperheroesRoutingModule,
    PaginatorComponent,
    SearchBarComponent,
    ...MATERIAL_MODULES,
  ],
})
export class SuperheroesModule {}
