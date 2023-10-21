import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ViewChild } from '@angular/core';
import { GameDescriptionComponent } from 'src/app/game-description/game-description.component';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore,  collectionData,doc, onSnapshot, addDoc, deleteDoc, orderBy,collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { updateDoc } from "firebase/firestore";
import { query, where,limit} from "firebase/firestore";




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
  
})
export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  pickCardAnimation = false;
  readyToStart = false;
  currentCard: string = '';
  screenWidth = window.innerWidth;
  game: Game;
  gameOver = false;
  unsubGames;


  //  items$;
  // items;

  games: Partial<Game>[] = [];
  constructor(public dialog: MatDialog) {
    this.game = new Game();
    this.unsubGames = this.subGamesList();
  //   this.items$ = collectionData(this.getGameRef());
  //   this.items = this.items$.subscribe((list)=> {
  //     list.forEach(element => {
  //       console.log(element);
  //     });
  //   });
    
  // 

  }
  
  
  ngOnInit(): void {
    this.newGame();
    // this.unsubGames = this.subGamesList();
    
  }
  @ViewChild(GameDescriptionComponent, { static: false }) gameDescription!: GameDescriptionComponent;

  newGame() {
    this.game = new Game();
  }

  subGamesList() {
     return onSnapshot(this.getGameRef(), (list)=> {
      this.games = [];
        list.forEach(element => {
          this.games.push(this.game.toJson(),element.data());
          console.log(element.data());
        });
      });
  }


  



  ngOnDestroy() {
    this.unsubGames();
      // this.items.unsubscribe();
  }
  pickCard() {
    if (this.game.players.length >= 2) {
      this.gameDescription.readyToStart = true;
      
    const card = this.game.stack.pop();
    if (card !== undefined && !this.pickCardAnimation) {
     
      this.currentCard = card;
      this.playAudio();
      this.pickCardAnimation = true;
    } 
    this.pushCurrentCard();
  }else {
    this.gameDescription.readyToStart = false;
    
  } 
  }

  pushCurrentCard() {
    setTimeout(() => {
      this.game.playedCard.push(this.currentCard);
      this.pickCardAnimation = false;
      this.checkNextPlayer();
    }, 2000)
  }


  playAudio(){
    let audio = new Audio();
    audio.src = "assets/card-sound.mp3";
    audio.load();
    audio.play();
  }


  checkNextPlayer() {
    if (this.game.currentPlayer == this.game.players.length -1) {
        this.game.currentPlayer = 0;
    } else if (this.pickCardAnimation == false) {
      this.game.currentPlayer++;
    } 
  }

  get cardArray(): number[] {
    const maxCards = 5;
    let start = Math.max(maxCards - this.game.stack.length,0);
    if  ( this.game.stack.length == 0) {
      setTimeout(() => {
        this.gameOver = true;
      }, 3000)
    }
    return [1, 2, 3, 4, 5].slice(start);
  
  }

  getGameRef(){
    return collection(this.firestore, 'games')
   }

  

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.trim() !== '' && this.game.players.length < 10) {
        this.game.players.push(name);
      }
    });
  }

}


