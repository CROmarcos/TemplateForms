import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface QuestionGroup {
  id: number;
  name: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  @Input() questionGroups: QuestionGroup[] = [];
  @Output() select = new EventEmitter<number>();
  @Output() add = new EventEmitter<void>();

  searchTerm: string = '';

  get filteredGroups() {
    if (!this.searchTerm) return this.questionGroups;
    return this.questionGroups.filter(group =>
      group.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
