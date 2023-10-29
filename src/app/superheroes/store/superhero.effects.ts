import { SuperheroesService } from './../superheroes.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  tap,
  withLatestFrom,
  switchMap,
} from 'rxjs/operators';
import { SuperheroActions } from './superhero.actions';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Store } from '@ngrx/store';
import { SuperheroState, selectPageInfo } from './superhero.reducer';

@Injectable()
export class SuperheroEffects {
  loadSuperheroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuperheroActions.loadSuperheroes),
      mergeMap((action) =>
        this.superheroesService
          .getSuperheroes(action.pageIndex, action.pageSize, action.searchValue)
          .pipe(
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

  deleteSuperhero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuperheroActions.deleteSuperhero),
      mergeMap((action) =>
        this.superheroesService.deleteSuperhero(action.id).pipe(
          map(() => SuperheroActions.deleteSuperheroSuccess({ id: action.id })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteSuperheroSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuperheroActions.deleteSuperheroSuccess),
      withLatestFrom(this.store.select(selectPageInfo)),
      switchMap(([action, { page, size, totalCount }]) => {
        this.notificationsService.emitNotification(
          `Superhero ${action.id} deleted successfully`,
          'success'
        );
        if (totalCount > size * page - 1) {
          return this.superheroesService.getSuperheroes(page * size, 1).pipe(
            map((response) =>
              SuperheroActions.addSuperhero({ superhero: response.data[0] })
            ),
            catchError(() => EMPTY)
          );
        }
        return EMPTY;
      })
    )
  );

  constructor(
    private actions$: Actions,
    private superheroesService: SuperheroesService,
    private store: Store<SuperheroState>,
    private notificationsService: NotificationsService
  ) {}
}
