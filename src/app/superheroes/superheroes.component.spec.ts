import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroesComponent } from './superheroes.component';

describe('SuperheroesComponent', () => {
  let component: SuperheroesComponent;
  let fixture: ComponentFixture<SuperheroesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperheroesComponent]
    });
    fixture = TestBed.createComponent(SuperheroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
