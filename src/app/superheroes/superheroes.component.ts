import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SuperheroesService } from './superheroes.service';
import {
  SuperheroState,
  selectAll,
  selectSuperheroesWithCount,
  selectTotal,
} from './store/superhero.reducer';
import { Store } from '@ngrx/store';
import { SuperheroActions } from './store/superhero.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Superhero } from './store/superhero.model';
import { DEFAULT_PAGE_INFO } from '../shared/components/paginator/paginator.component';

@Component({
  selector: 'app-superheroes',
  templateUrl: './superheroes.component.html',
  styleUrls: ['./superheroes.component.scss'],
})
export class SuperheroesComponent {
  pageInfo: PageEvent = DEFAULT_PAGE_INFO;
  superheroes!: Superhero[];
  searchValue!: string;

  constructor(private superheroStore: Store<SuperheroState>) {
    this.superheroStore
      .select(selectSuperheroesWithCount)
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        this.superheroes = result.superheroes;
        this.pageInfo.length = result.totalCount;
      });
  }

  ngOnInit(): void {
    this.superheroStore.dispatch(
      SuperheroActions.loadSuperheroes({ pageIndex: 1, pageSize: 10 })
    );
  }

  searchValueChanged(search: string) {
    this.searchValue = search;
    this.pageInfo.pageIndex = 0;
    this.superheroStore.dispatch(
      SuperheroActions.loadSuperheroes({
        pageIndex: 1,
        pageSize: this.pageInfo.pageSize,
        searchValue: this.searchValue,
      })
    );
  }

  paginationEvent(event: PageEvent) {
    this.pageInfo.pageIndex = event.pageIndex;
    this.pageInfo.pageSize = event.pageSize;
    this.superheroStore.dispatch(
      SuperheroActions.loadSuperheroes({
        pageIndex: event.pageIndex + 1,
        pageSize: event.pageSize,
        searchValue: this.searchValue
      })
    );
  }
}
