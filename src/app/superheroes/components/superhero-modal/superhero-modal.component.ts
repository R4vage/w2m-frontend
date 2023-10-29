// superhero-modal.component.ts
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Superhero } from '../../store/superhero.model'; 

@Component({
  selector: 'app-superhero-modal',
  templateUrl: './superhero-modal.component.html',
  styleUrls: ['./superhero-modal.component.scss'],
})
export class SuperheroModalComponent implements OnInit {
  superheroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Superhero,
    private dialogRef: MatDialogRef<SuperheroModalComponent>
  ) {}

  ngOnInit(): void {
    this.superheroForm = this.fb.group({
      id: [
        {value: this.data?.id || '', disabled: !!this.data},
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      alter_ego: [
        this.data?.alter_ego || '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      first_appearance: [
        this.data?.first_appearance || '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      publisher: [
        this.data?.publisher || '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      birth_year: [
        this.data?.birth_year || '',
        [Validators.required, Validators.min(0), Validators.max(5000)],
      ],
      power_level: [
        this.data?.power_level || '',
        [Validators.required, Validators.min(1), Validators.max(10)],
      ],
    });
  }

  onSubmit() {
    if (this.superheroForm.valid) {
      this.dialogRef.close(this.superheroForm.value);
    }
  }

}
