import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { QuestionTypeDialogComponent } from '../question-type-dialog/question-type-dialog.component';

interface Question {
  number: number;
  text: string;
  type: string;
}

@Component({
  selector: 'app-card',
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, DragDropModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() text: string = '';
  @Input() questions: Question[] = [];
  @Output() delete = new EventEmitter<void>();

  constructor(private readonly dialog: MatDialog) { }

  // questions: Question[] = [
  //   { number: 1, text: 'Pitanje A', type: 'text' },
  //   { number: 2, text: 'Pitanje B', type: 'multiple-choice' },
  //   { number: 3, text: 'Pitanje C', type: 'text' },
  // ];

  drop(event: CdkDragDrop<Question[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    this.updateQuestionNumbers();
  }

  private updateQuestionNumbers(): void {
    this.questions.forEach((q, i) => q.number = i + 1);
  }

  addNewQuestion(type: string) {
    const newQuestion: Question = {
      number: this.questions.length + 1,
      text: `Pitanje ${this.questions.length + 1}`,
      type: type
    };
    this.questions.push(newQuestion);
  }

  deleteQuestion(index: number): void {
    this.questions.splice(index, 1);
    this.updateQuestionNumbers();
  }

  openQuestionTypeDialog(): void {
    const dialogRef = this.dialog.open(QuestionTypeDialogComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Odabrani tip pitanja:', result);
        this.addNewQuestion(result);
      }
    });
  }

  deleteCard() {
    this.delete.emit();
  }
}
