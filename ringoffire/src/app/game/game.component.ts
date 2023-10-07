import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;
  constructor() {
    this.game = new Game();
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  pickCard() {
    const card = this.game.stack.pop();
    if (card !== undefined && !this.pickCardAnimation) {
      this.currentCard = card;
      console.log(this.currentCard);
      this.pickCardAnimation = true;

    } else {
      console.log('No cards available');
    }

    setTimeout(() => {
      this.game.playedCard.push(this.currentCard);
      this.pickCardAnimation = false;
    }, 2500)

  }

}
