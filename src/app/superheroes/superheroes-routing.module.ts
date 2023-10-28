import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperheroesComponent } from './superheroes.component';

const routes: Routes = [
  {
    path: '',
    component: SuperheroesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperheroesRoutingModule {}
