import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  readyToStart = true;;
  currentCard: string = '';
  game: Game;
  constructor(public dialog: MatDialog) {
    this.game = new Game();

  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  pickCard() {
    if (this.game.players.length >= 2) {
      this.readyToStart = true;
    const card = this.game.stack.pop();
    if (card !== undefined && !this.pickCardAnimation) {
      this.currentCard = card;
      this.pickCardAnimation = true;
    } else {
      console.log('No cards available');
    }
    setTimeout(() => {
      this.game.playedCard.push(this.currentCard);
      this.pickCardAnimation = false;
      this.checkNextPlayer();
    }, 2000)
  }else {
    this.readyToStart = false;
  } 

  }

  checkNextPlayer() {
    if (this.game.currentPlayer == this.game.players.length -1) {
        this.game.currentPlayer = 0;
    } else if (this.pickCardAnimation == false) {
      this.game.currentPlayer++;
    } {
 
  }

  console.log(this.game.stack.length);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.trim() !== '') {
        this.game.players.push(name);
      }
    });
  }

}


