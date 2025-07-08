import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuestionGroup {
  id: number;
  name: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  @Input() questionGroups: QuestionGroup[] = [];
  @Output() select = new EventEmitter<number>();
  @Output() add = new EventEmitter<void>();
}
