import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, DragDropModule, MatButtonModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() text: string = '';
  @Output() delete = new EventEmitter<void>();

  questions = [
    'pitanje A',
    'pitanje B',
    'pitanje C'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  addNewQuestion() {
    const newQuestion = `Pitanje ${this.questions.length + 1}`;
    this.questions.push(newQuestion);
  }

  deleteCard() {
    this.delete.emit();
  }
}
