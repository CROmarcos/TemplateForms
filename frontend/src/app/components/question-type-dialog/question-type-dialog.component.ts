import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-question-type-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatListModule, MatButtonModule],
  templateUrl: './question-type-dialog.component.html',
  styleUrls: ['./question-type-dialog.component.scss'],
})
export class QuestionTypeDialogComponent {
  questionTypes = [
    { label: 'Tekstualno polje (kratko / dugačko)', value: 'text' },
    { label: 'Brojčano polje', value: 'number' },
    { label: 'Datum / Vrijeme', value: 'datetime' },
    { label: 'Checkbox (DA/NE)', value: 'checkbox' },
    { label: 'Ocjena (1–5)', value: 'rating_1_5' },
    { label: 'Ocjena (A–D)', value: 'rating_a_d' },
    { label: 'Dropdown (s opcijama)', value: 'dropdown' },
    { label: 'Tablični unos', value: 'table' },
    { label: 'Performance objective', value: 'performance' },
    { label: 'Potvrda slaganja', value: 'agreement' },
    { label: 'Automatski unos [A]', value: 'auto' },
    { label: 'Uvjetna logika', value: 'conditional' },
  ];

  constructor(private readonly dialogRef: MatDialogRef<QuestionTypeDialogComponent>) {}

  selectType(type: string) {
    this.dialogRef.close(type);
  }

  cancel() {
    this.dialogRef.close();
  }
}
