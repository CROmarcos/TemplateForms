import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Question } from '../card/card.component';

@Component({
  selector: 'app-response-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './response-form.component.html',
  styleUrl: './response-form.component.scss'
})
export class ResponseFormComponent {
  @Input() questions: Question[] = [];
  @Output() submitAnswers = new EventEmitter<Question[]>();

  onSubmit() {
    for (const q of this.questions) {
      if (q.type === 'rating_1_5' && q.answer === 1 && !q.comment?.trim()) {
        alert('Molimo unesite komentar za ocjenu 1.');
        return;
      }
    }

    console.log('Popunjeni odgovori:', JSON.stringify(this.questions, null, 2));
    this.submitAnswers.emit(this.questions);  }

}
