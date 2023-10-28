import {
  animate,
  query,
  sequence,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const DropDownAnimation = trigger('dropDownMenu', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    query('.menu-item', [
      style({ opacity: 0, transform: 'translateY(-50px)' }),
    ]),
    sequence([
      animate(
        '400ms ease-out',
        style({ transform: 'translateY(calc(75% - 1rem))' })
      ),
      query('.menu-item', [
        stagger(-50, [
          animate('400ms ease', style({ opacity: 1, transform: 'none' })),
        ]),
      ]),
    ]),
  ]),

  transition(':leave', [
    style({ transform: 'translateY(calc(75% - 1rem))' }),
    query('.menu-item', [style({ opacity: 1, transform: 'none' })]),
    sequence([
      query('.menu-item', [
        stagger(50, [
          animate(
            '400ms ease',
            style({ opacity: 0, transform: 'translateY(-50px)' })
          ),
        ]),
      ]),
      animate('400ms ease-in', style({ transform: 'translateY(-100%)' })),
    ]),
  ]),
]);
