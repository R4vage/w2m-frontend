import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroModalComponent } from './superhero-modal.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { SUPERHEROES_MOCK } from '../../mocks/superheroes.mock';
import { Superhero } from '../../store/superhero.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SuperheroModalComponent', () => {
  let component: SuperheroModalComponent;
  let fixture: ComponentFixture<SuperheroModalComponent>;
  const mockSuperhero: Superhero = SUPERHEROES_MOCK[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperheroModalComponent],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(SuperheroModalComponent);
    component = fixture.componentInstance;
    component.data = mockSuperhero;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
