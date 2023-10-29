import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  BehaviorSubject,
  skip,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const MaterialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
];

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...MaterialModules],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  inputSubject$ = new BehaviorSubject<string>('');
  searchControl = new FormControl();

  @Output() inputEventEmitter = new EventEmitter<string>();
  inputSubscription!: Subscription;

  constructor() {
    this.inputSubscription = this.inputSubject$
      .pipe(
        skip(1),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed()
      )
      .subscribe((value) => {
        this.inputEventEmitter.emit(value);
      });
  }

  clearInput(): void {
    this.searchControl.setValue('');
    this.inputSubject$.next('');
  }
  inputChange(inputValue: string): void {
    this.inputSubject$.next(inputValue.trim().toLowerCase());
  }
}
