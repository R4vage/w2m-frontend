import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Superhero } from './superhero.model';
import { SuperheroActions } from './superhero.actions';

export const superheroesFeatureKey = 'superheroes';

export interface SuperheroState extends EntityState<Superhero> {
  totalCount:number;
}

export const adapter: EntityAdapter<Superhero> =
  createEntityAdapter<Superhero>();

export const initialState: SuperheroState = adapter.getInitialState({
  totalCount: 0
});

export const reducer = createReducer(
  initialState,
  on(SuperheroActions.addSuperhero, (state, action) =>
    adapter.addOne(action.superhero, state)
  ),
  on(SuperheroActions.upsertSuperhero, (state, action) =>
    adapter.upsertOne(action.superhero, state)
  ),
  on(SuperheroActions.addSuperheroes, (state, action) =>
    adapter.addMany(action.superheroes, state)
  ),
  on(SuperheroActions.upsertSuperheroes, (state, action) =>
    adapter.upsertMany(action.superheroes, state)
  ),
  on(SuperheroActions.updateSuperhero, (state, action) =>
    adapter.updateOne(action.superhero, state)
  ),
  on(SuperheroActions.updateSuperheroes, (state, action) =>
    adapter.updateMany(action.superheroes, state)
  ),
  on(SuperheroActions.deleteSuperhero, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(SuperheroActions.deleteSuperheroes, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(SuperheroActions.loadSuperheroesSuccess, (state, action) =>
    {return adapter.setAll(action.superheroes, {...state,totalCount:action.totalCount})}
  ),
  on(SuperheroActions.clearSuperheroes, (state) => adapter.removeAll(state))
);

export const superheroesFeature = createFeature({
  name: superheroesFeatureKey,
  reducer,
  extraSelectors: ({ selectSuperheroesState }) => ({
    ...adapter.getSelectors(selectSuperheroesState),
  }),
});

export const selectSuperheroState = (state: any) => state[superheroesFeatureKey];

export const selectTotalCount = createSelector(
  selectSuperheroState,
  (state: SuperheroState) => state.totalCount
);

export const selectSuperheroesWithCount = createSelector(
  superheroesFeature.selectAll,
  selectTotalCount,
  (superheroes, totalCount) => ({ superheroes, totalCount })
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  superheroesFeature;
