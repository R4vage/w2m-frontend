import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { SuperheroesComponent } from '../superheroes.component';
import { HeroCardComponentMock } from '../mocks/hero-card.mock'; 
import { SuperheroModalComponentMock } from '../mocks/superhero-modal.mock';
import { SUPERHEROES_MOCK } from '../mocks/superheroes.mock'; 
import { PaginatorComponentMock } from 'src/app/shared/mocks/paginator.mock';
import { SearchBarComponentMock } from 'src/app/shared/mocks/search-bar.mock';
import { ConfirmModalComponentMock } from 'src/app/shared/mocks/confirm-modal.mock';


fdescribe('SuperheroesComponent', () => {
  let component: SuperheroesComponent;
  let fixture: ComponentFixture<SuperheroesComponent>;
  let storeMock: any;
  let dialogMock: any;

  beforeEach(() => {
    storeMock = {
      dispatch: jasmine.createSpy('dispatch'),
      select: jasmine.createSpy('select').and.returnValue(of({
        superheroes: SUPERHEROES_MOCK,
        totalCount: SUPERHEROES_MOCK.length
      }))
    };
    const afterClosedMock = of(null);
    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => afterClosedMock
      })
    };

    TestBed.configureTestingModule({
      declarations: [SuperheroesComponent, HeroCardComponentMock, SuperheroModalComponentMock],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: MatDialog, useValue: dialogMock }
      ],
      imports: [PaginatorComponentMock, SearchBarComponentMock, ConfirmModalComponentMock]
    });

    fixture = TestBed.createComponent(SuperheroesComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadSuperheroes on init', () => {
    expect(storeMock.dispatch).toHaveBeenCalled();
  });

  it('should display superheroes', () => {
    const superheroElements = fixture.debugElement.queryAll(By.css('app-hero-card'));
    expect(superheroElements.length).toEqual(SUPERHEROES_MOCK.length);
  });

  it('should update search value and reset page index when search value changes', () => {
    const searchValue = 'Batman';
    component.searchValueChanged(searchValue);

    expect(component.searchValue).toBe(searchValue);
    expect(component.pageInfo.pageIndex).toBe(0);
    expect(storeMock.dispatch).toHaveBeenCalled();
  });

  it('should dispatch loadSuperheroes when pagination changes', () => {
    component.paginationEvent({ pageIndex: 1, pageSize: 5, length:10 });
    expect(storeMock.dispatch).toHaveBeenCalled();
  });

  it('should open delete modal', () => {
    component.openConfirmDeleteModal('Batman');
    expect(dialogMock.open).toHaveBeenCalled();
  });

  it('should open superhero modal for addition', () => {
    component.openSuperheroModal();
    expect(dialogMock.open).toHaveBeenCalled();
  });

  it('should open superhero modal for editing', () => {
    component.openSuperheroModal(SUPERHEROES_MOCK[0]);
    expect(dialogMock.open).toHaveBeenCalled();
  });
});
