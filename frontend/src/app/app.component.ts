import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  questionGroups = [
    {
      id: 1,
      name: 'Grupa 1',
      questions: [
        { number: 1, text: 'Pitanje A', type: 'text' },
        { number: 2, text: 'Pitanje B', type: 'multiple-choice' }
      ]
    },
    {
      id: 2,
      name: 'Grupa 2',
      questions: [
        { number: 1, text: 'Pitanje X', type: 'text' },
        { number: 2, text: 'Pitanje Y', type: 'text' }
      ]
    }
  ];

  selectedGroupId: number | null = this.questionGroups[0]?.id || null;

  get selectedGroup() {
    return this.questionGroups.find(g => g.id === this.selectedGroupId) || null;
  }

  selectGroup(id: number) {
    this.selectedGroupId = id;
  }

  addNewGroup() {
    const newId = this.questionGroups.length
      ? Math.max(...this.questionGroups.map(g => g.id)) + 1
      : 1;

    const newGroup = {
      id: newId,
      name: `Grupa ${newId}`,
      questions: []
    };

    this.questionGroups.push(newGroup);
    this.selectGroup(newId);
  }

  deleteGroup(id: number) {
    this.questionGroups = this.questionGroups.filter(group => group.id !== id);

    if (this.questionGroups.length) {
      this.selectedGroupId = this.questionGroups[0].id;
    } else {
      this.selectedGroupId = null;
    }
  }
}
