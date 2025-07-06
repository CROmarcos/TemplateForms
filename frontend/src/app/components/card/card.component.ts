import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { QuestionTypeDialogComponent } from '../question-type-dialog/question-type-dialog.component';

export interface Question {
  number: number;
  text: string;
  type: string;
  options?: string[];
  required?: boolean;
  answer?: any;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() text: string = '';
  @Input() questions: Question[] = [];
  @Output() delete = new EventEmitter<void>();

  constructor(private readonly dialog: MatDialog) {}

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
      text: '',
      type: type,
      options: this.getDefaultOptions(type)
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
      disableClose: true
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

  private getDefaultOptions(type: string): string[] | undefined {
    switch (type) {
      case 'dropdown':
        return ['Opcija 1', 'Opcija 2'];
      case 'checkbox':
        return ['Da', 'Ne'];
      case 'rating-1-5':
        return ['1', '2', '3', '4', '5'];
      case 'rating-A-D':
        return ['A', 'B', 'C', 'D'];
      case 'table':
        return ['Red 1', 'Red 2']; // primjer tabličnog unosa
      default:
        return undefined;
    }
  }
}
