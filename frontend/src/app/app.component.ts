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

  cards = [
    { id: 1, text: 'Grupa 1' },
    { id: 2, text: 'Grupa 2' },
    { id: 3, text: 'Grupa 3' }
  ];

  selectedCard: { id: number; text: string } | null = this.cards[0];

  selectCard(card: { id: number; text: string }) {
    this.selectedCard = card;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const clickedCard = (event.target as HTMLElement).innerText;
      const card = this.cards.find(c => c.text === clickedCard);
      if (card) {
        this.selectCard(card);
      }
    }
  }

  addNewGroup() {
    console.log("Add new group")
    const newCard = {
      id: this.cards.length + 1,
      text: `Grupa ${this.cards.length + 1}`
    };

    this.cards.push(newCard);
    this.selectedCard = newCard;
  }
}
