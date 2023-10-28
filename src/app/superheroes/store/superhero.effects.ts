import { SuperheroesService } from './../superheroes.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { SuperheroActions } from './superhero.actions';

@Injectable()
export class SuperheroEffects {
  loadSuperheroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuperheroActions.loadSuperheroes),
      mergeMap((action) =>
        this.superheroesService.getAll(action.pageIndex, action.pageSize, action.searchValue).pipe(
          map((response) =>
            SuperheroActions.loadSuperheroesSuccess({
              superheroes: response.data,
              totalCount: response.totalCount,
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private superheroesService: SuperheroesService
  ) {}
}
