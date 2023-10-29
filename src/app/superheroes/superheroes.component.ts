import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  SuperheroState,
  selectSuperheroesWithCount,
} from './store/superhero.reducer';
import { Store } from '@ngrx/store';
import { SuperheroActions } from './store/superhero.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Superhero } from './store/superhero.model';
import { DEFAULT_PAGE_INFO } from '../shared/components/paginator/paginator.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../shared/components/confirm-modal/confirm-modal.component';
import { SuperheroModalComponent } from './components/superhero-modal/superhero-modal.component';

@Component({
  selector: 'app-superheroes',
  templateUrl: './superheroes.component.html',
  styleUrls: ['./superheroes.component.scss'],
})
export class SuperheroesComponent {
  pageInfo: PageEvent = DEFAULT_PAGE_INFO;
  superheroes!: Superhero[];
  searchValue!: string;

  constructor(
    private superheroStore: Store<SuperheroState>,
    public dialog: MatDialog
  ) {
    this.superheroStore
      .select(selectSuperheroesWithCount)
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        this.superheroes = result.superheroes;
        this.pageInfo.length = result.totalCount;
        if (!this.superheroes.length && this.pageInfo.length) {
          this.paginationEvent({
            ...this.pageInfo,
            pageIndex: this.pageInfo.pageIndex - 1,
          });
        }
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
        searchValue: this.searchValue,
      })
    );
  }

  openConfirmDeleteModal(id: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '250px',
      data: 'Do you confirm the deletion?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.superheroStore.dispatch(SuperheroActions.deleteSuperhero({ id }));
      }
    });
  }

  openSuperheroModal(superhero?: Superhero) {
    const dialogRef = this.dialog.open(SuperheroModalComponent, {
      data: superhero,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      if (!superhero) {
        this.superheroStore.dispatch(
          SuperheroActions.insertSuperhero({ superhero: result })
        );
      } else {
        this.superheroStore.dispatch(
          SuperheroActions.updateSuperhero({
            superhero: { ...result, id: superhero.id },
          })
        );
      }
    });
  }
}
