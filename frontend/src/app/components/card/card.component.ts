import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { QuestionTypeDialogComponent } from '../question-type-dialog/question-type-dialog.component';

export interface Question {
  number: number;
  text: string;
  type: string;
  options?: string[];
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    DragDropModule,
    FormsModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() text: string = '';
  @Input() questions: Question[] = [];
  @Input() description: string | undefined;
  @Input() isConfirmed: boolean = false;
  @Input() location: string | undefined;
  @Input() confirmationTime: string | undefined;
  @Output() textChange = new EventEmitter<string>();
  @Output() descriptionChange = new EventEmitter<string>();
  @Output() delete = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<Question[]>();

  hover = false;
  editingTitle = false;
  editingDescription = false;

  constructor(private readonly dialog: MatDialog) { }

  drop(event: CdkDragDrop<Question[]>) {
    if (this.isConfirmed) return;
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    this.updateQuestionNumbers();
  }

  private updateQuestionNumbers(): void {
    this.questions.forEach((q, i) => q.number = i + 1);
  }

  addNewQuestion(type: string) {
    if (this.isConfirmed) return;
    const newQuestion: Question = {
      number: this.questions.length + 1,
      text: '',
      type: type
    };
    this.questions.push(newQuestion);
  }

  deleteQuestion(index: number): void {
    if (this.isConfirmed) return;
    this.questions.splice(index, 1);
    this.updateQuestionNumbers();
  }

  openQuestionTypeDialog(): void {
    if (this.isConfirmed) return;
    const dialogRef = this.dialog.open(QuestionTypeDialogComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addNewQuestion(result);
      }
    });
  }

  deleteCard() {
    this.delete.emit();
  }

  confirmGroupOfQuestions() {
    this.confirm.emit(this.questions);
  }

  startEditing(field: 'title' | 'description') {
    if (field === 'title') {
      this.editingTitle = true;
    } else {
      this.editingDescription = true;
    }
  }

  stopEditing() {
    if (this.editingTitle) {
      this.textChange.emit(this.text);
    }
    if (this.editingDescription) {
      this.descriptionChange.emit(this.description);
    }
    this.editingTitle = false;
    this.editingDescription = false;
  }
}
