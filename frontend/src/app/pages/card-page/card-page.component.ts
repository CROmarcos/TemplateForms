import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent, Question } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';

interface QuestionGroup {
  id: number;
  name: string;
  description?: string;
  questions: Question[];
  isConfirmed: boolean;
  confirmationTime?: string;
  location?: string;
}

@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-page.component.html'
})
export class CardPageComponent {
  @Input() group!: QuestionGroup;

  @Output() back = new EventEmitter<void>();
  @Output() update = new EventEmitter<{ id: number; changes: Partial<QuestionGroup> }>();
  @Output() delete = new EventEmitter<{ id: number }>();
  @Output() confirm = new EventEmitter<{ id: number; questions: Question[] }>();

  handleTextChange(name: string) {
    this.update.emit({ id: this.group.id, changes: { name } });
  }

  handleDescriptionChange(description: string) {
    this.update.emit({ id: this.group.id, changes: { description } });
  }

  handleDelete() {
    this.delete.emit({ id: this.group.id });
  }

  handleConfirm(questions: Question[]) {
    this.confirm.emit({ id: this.group.id, questions });
  }
}
