import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent, Question } from './components/card/card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewGroupDialogComponent } from './components/new-group-dialog/new-group-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  imports: [FormsModule, HeaderComponent, CardComponent, CommonModule],
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
    }
  ];

  constructor(private readonly dialog: MatDialog) { }

  selectedGroupId: number = this.questionGroups[0].id;

  get selectedGroup(): QuestionGroup | undefined {
    return this.questionGroups.find(g => g.id === this.selectedGroupId);
  }

  selectCard(id: number) {
    this.selectedGroupId = id;
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
}
