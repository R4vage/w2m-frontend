import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Superhero } from './superhero.model';

export const SuperheroActions = createActionGroup({
  source: 'Superhero/API',
  events: {
    'Load Superheroes':props<{ pageIndex: number, pageSize: number, searchValue?:string }>(),
    'Load Superheroes Success': props<{ superheroes: Superhero[], totalCount:number }>(),
    'Partial Fetch Superheroes':props<{ pageIndex: number, pageSize: number, searchValue?:string }>(),
    'Partial Fetch Superheroes Success': props<{ superheroes: Superhero[], totalCount:number }>(),

    'Add Superhero': props<{ superhero: Superhero }>(),
    'Upsert Superhero': props<{ superhero: Superhero }>(),
    'Add Superheroes': props<{ superheroes: Superhero[] }>(),
    'Upsert Superheroes': props<{ superheroes: Superhero[] }>(),
    'Update Superhero': props<{ superhero: Update<Superhero> }>(),
    'Update Superheroes': props<{ superheroes: Update<Superhero>[] }>(),
    'Delete Superhero': props<{ id: string }>(),
    'Delete Superhero Success': props<{ id: string }>(),
    'Delete Superheroes': props<{ ids: string[] }>(),
    'Clear Superheroes': emptyProps(),
  },
});
