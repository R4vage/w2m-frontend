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
    
    'Delete Superhero': props<{ id: string }>(),
    'Delete Superhero Success': props<{ id: string }>(),
    
    'Add Superhero': props<{ superhero: Superhero }>(),
    
    'Insert Superhero': props<{ superhero: Superhero }>(),
    'Insert Superhero Success': props<{ superhero: Superhero }>(),
    
    'Update Superhero': props<{superhero: Superhero }>(),
    'Update Superhero Success': props<{ superhero: Update<Superhero> }>(),

    'Update Count': props<{totalCount:number}>(),

    'Upsert Superhero': props<{ superhero: Superhero }>(),
    'Add Superheroes': props<{ superheroes: Superhero[] }>(),
    'Upsert Superheroes': props<{ superheroes: Superhero[] }>(),
    'Update Superheroes': props<{ superheroes: Update<Superhero>[] }>(),
    'Delete Superheroes': props<{ ids: string[] }>(),
    'Clear Superheroes': emptyProps(),
  },
});
