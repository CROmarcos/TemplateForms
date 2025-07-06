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

@Component({
  selector: 'app-card',
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, DragDropModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() text: string = '';
  @Output() delete = new EventEmitter<void>();

  constructor(private readonly dialog: MatDialog) {}

  questions = [
    'pitanje A',
    'pitanje B',
    'pitanje C'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  addNewQuestion(type: string) {
    const newQuestion = `Pitanje ${this.questions.length + 1}, (${type})`;
    this.questions.push(newQuestion);
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
