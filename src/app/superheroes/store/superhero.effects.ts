import { SuperheroesService } from './../superheroes.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  withLatestFrom,
  switchMap
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

  insertSuperhero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuperheroActions.insertSuperhero),
      mergeMap((action) =>{
        return this.superheroesService.insertSuperhero(action.superhero).pipe(
          map(() =>
            SuperheroActions.insertSuperheroSuccess({
              superhero: action.superhero,
            })
          ),
          catchError(() => EMPTY)
        )}
      )
    )
  );

  insertSuperheroSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuperheroActions.insertSuperheroSuccess),
      withLatestFrom(this.store.select(selectPageInfo)),
      switchMap(([action, { page, size, totalCount, search }]) => {
        this.notificationsService.emitNotification(
          `Superhero ${action.superhero.id} created successfully`,
          'success'
        );
        if (totalCount < size * page - 1 && search && action.superhero.id.toLowerCase().includes(search)) {
          return of(SuperheroActions.addSuperhero({superhero:action.superhero}))
        }
        return EMPTY;
      })
    )
  );

  updateSuperhero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuperheroActions.updateSuperhero),
      mergeMap((action) =>{
        return this.superheroesService.patchSuperhero(action.superhero).pipe(
          map(() =>
            SuperheroActions.updateSuperheroSuccess({superhero:{
              id:action.superhero.id,
              changes: action.superhero,
            }})
          ),
          catchError(() => EMPTY)
        )}
      )
    )
  );
  constructor(
    private actions$: Actions,
    private superheroesService: SuperheroesService,
    private store: Store<SuperheroState>,
    private notificationsService: NotificationsService
  ) {}
}
