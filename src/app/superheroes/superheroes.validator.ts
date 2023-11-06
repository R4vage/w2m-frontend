import { Injectable } from '@angular/core';
import {
  FormControl,
  AsyncValidator,
  ValidationErrors,
  AsyncValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, catchError, switchMap } from 'rxjs/operators';
import { SuperheroesService } from './superheroes.service';

@Injectable()
export class SuperheroValidators {
  constructor(private superheroService: SuperheroesService) {}

  superheroNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        debounceTime(300),
        switchMap((value) => {
          if (value && value.trim() !== '') {
            return this.superheroService.getSuperhero(value).pipe(
              map((isTaken) => (isTaken ? { nameTaken: true } : null)),
              catchError(() => of(null))
            );
          } else {
            return of(null);
          }
        })
      );
    };
  }
}
