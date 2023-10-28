import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './core/router/routes.enum';

const routes: Routes = [
  {
    path: AppRoutes.SUPERHEROES,
    loadChildren: () =>
      import('./superheroes/superheroes.module').then(
        (m) => m.SuperheroesModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./error-page/error-page.module').then((m) => m.ErrorPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
