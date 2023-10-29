import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeroCardComponent } from './hero-card.component';
import { Superhero } from '../../store/superhero.model';

import { SUPERHEROES_MOCK } from '../../mocks/superheroes.mock';

import { MatCardModule } from '@angular/material/card';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroCardComponent],
      imports: [MatCardModule],
    });
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    component.superhero = SUPERHEROES_MOCK[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('should display superhero details correctly', () => {
    const superhero: Superhero = SUPERHEROES_MOCK[0];

    const title = fixture.debugElement.query(By.css('mat-card-title'))
      .nativeElement.textContent;
    expect(title).toContain(superhero.id);

    const subtitle = fixture.debugElement.query(By.css('mat-card-subtitle'))
      .nativeElement.textContent;
    expect(subtitle).toContain(superhero.publisher);

    const alterEgo = fixture.debugElement.query(
      By.css('mat-card-content p:nth-child(1)')
    ).nativeElement.textContent;
    expect(alterEgo).toContain(superhero.alter_ego);

    const firstAppearance = fixture.debugElement.query(
      By.css('mat-card-content p:nth-child(2)')
    ).nativeElement.textContent;
    expect(firstAppearance).toContain(superhero.first_appearance);

    const birthYear = fixture.debugElement.query(
      By.css('mat-card-content p:nth-child(3)')
    ).nativeElement.textContent;
    expect(birthYear).toContain(superhero.birth_year);
  });

  it('should emit editSuperhero event when Edit button is clicked', () => {
    spyOn(component.editSuperhero, 'emit');

    component.superhero = SUPERHEROES_MOCK[0];
    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('button[mat-raised-button]')
    ).nativeElement;
    button.click();

    expect(component.editSuperhero.emit).toHaveBeenCalledWith(
      component.superhero.id
    );
  });

  it('should emit deleteSuperhero event when Delete button is clicked', () => {
    spyOn(component.deleteSuperhero, 'emit');

    component.superhero = SUPERHEROES_MOCK[0];
    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('button[color="warn"]')
    ).nativeElement;
    button.click();

    expect(component.deleteSuperhero.emit).toHaveBeenCalledWith(
      component.superhero.id
    );
  });
});
