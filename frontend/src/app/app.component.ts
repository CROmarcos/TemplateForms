import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent, Question } from './components/card/card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewGroupDialogComponent } from './components/new-group-dialog/new-group-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CardPageComponent } from './pages/card-page/card-page.component';
import { ResponseFormComponent } from './components/response-form/response-form.component';

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
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HeaderComponent, CardComponent, CommonModule, HomePageComponent, CardPageComponent, ResponseFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  questionGroups: QuestionGroup[] = [
    {
      id: 1,
      name: 'Grupa 1',
      description: 'Probna grupa 1',
      questions: [
        { number: 1, text: 'Pitanje A', type: 'text' },
        { number: 2, text: 'Pitanje B', type: 'multiple-choice' }
      ],
      isConfirmed: false
    },
    {
      id: 2,
      name: 'Grupa 2',
      description: 'Probna grupa 2',
      questions: [
        { number: 1, text: 'Pitanje X', type: 'text' },
        { number: 2, text: 'Pitanje Y', type: 'text' }
      ],
      isConfirmed: false
    },
    {
      id: 3,
      name: 'Dodatni ispiti',
      description: 'Probna grupa 2',
      questions: [
        { number: 1, text: 'Pitanje X', type: 'text' },
        { number: 2, text: 'Pitanje Y', type: 'text' }
      ],
      isConfirmed: false
    },
    {
      id: 4,
      name: 'Filter 2B',
      description: 'Probna grupa 2',
      questions: [
        { number: 1, text: 'Pitanje X', type: 'text' },
        { number: 2, text: 'Pitanje Y', type: 'text' }
      ],
      isConfirmed: false
    },
    {
      id: 5,
      name: 'Testovi',
      description: 'Probna grupa 2',
      questions: [
        { number: 1, text: 'Pitanje X', type: 'text' },
        { number: 2, text: 'Pitanje Y', type: 'text' }
      ],
      isConfirmed: false
    },
    {
      id: 6,
      name: 'Grupa 2B',
      description: 'Probna grupa 2',
      questions: [
        { number: 1, text: 'Pitanje X', type: 'text' },
        { number: 2, text: 'Pitanje Y', type: 'text' }
      ],
      isConfirmed: false
    },
    {
      id: 7,
      name: 'Testiranje',
      description: 'Probna grupa 2',
      questions: [
        { number: 1, text: 'Pitanje X', type: 'text' },
        { number: 2, text: 'Pitanje Y', type: 'text' }
      ],
      isConfirmed: false
    },
  ];

  constructor(private readonly dialog: MatDialog) { }

  selectedGroupId: number = 0;
  respondingGroupId: number = 0;

  get selectedGroup(): QuestionGroup | undefined {
    return this.questionGroups.find(g => g.id === this.selectedGroupId);
  }

  selectCard(payload: { id: number; mode: 'edit' | 'respond' }) {
    if (payload.mode === 'edit') {
      this.selectedGroupId = payload.id;
      this.respondingGroupId = 0;
    } else {
      this.respondingGroupId = payload.id;
      this.selectedGroupId = 0;
    }
  }

  newGroupName: string = '';
  addingNewGroup: boolean = false;

  addNewGroup() {
    const dialogRef = this.dialog.open(NewGroupDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newId = this.questionGroups.length ? Math.max(...this.questionGroups.map(g => g.id)) + 1 : 1;
        const newGroup: QuestionGroup = {
          id: newId,
          name: result,
          questions: [],
          isConfirmed: false
        };
        this.questionGroups.push(newGroup);
        this.selectedGroupId = newId;
      }
    })
  }

  deleteGroup(id: number) {
    this.questionGroups = this.questionGroups.filter(g => g.id !== id);
    if (this.selectedGroupId === id) {
      this.selectedGroupId = this.questionGroups.length ? this.questionGroups[0].id : -1;
    }
  }

  confirmGroup(id: number, questions: Question[]) {
    const group = this.questionGroups.find(g => g.id === id);
    if (!group) return;

    group.isConfirmed = true;
    group.confirmationTime = new Date().toLocaleString();
    group.location = 'Lokacija nije dostupna';
    console.log(JSON.stringify(questions, null, 2));
  }

  updateGroup(id: number, changes: Partial<QuestionGroup>) {
    const group = this.questionGroups.find(g => g.id === id);
    if (group) Object.assign(group, changes);
  }

  get respondingGroup(): QuestionGroup | undefined {
    return this.questionGroups.find(g => g.id === this.respondingGroupId);
  }

  openResponseForm(id: number) {
    this.respondingGroupId = id;
    this.selectedGroupId = 0;
  }

  handleAnswers(answers: Question[]) {
    console.log('📋 Odgovori korisnika:\n', JSON.stringify(answers, null, 2));
    this.respondingGroupId = 0;
    this.deselectGroup();
  }

  deselectGroup() {
    this.selectedGroupId = 0;
    this.respondingGroupId = 0;
  }
}
