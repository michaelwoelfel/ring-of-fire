import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ViewChild } from '@angular/core';
import { GameDescriptionComponent } from 'src/app/game-description/game-description.component';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, doc, onSnapshot, addDoc, deleteDoc, orderBy, collection, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DocumentData, updateDoc } from "firebase/firestore";
import { query, where, limit, } from "firebase/firestore";
import {ActivatedRoute} from '@angular/router';
import { DocumentChange } from '@angular/fire/firestore';
import { GameServiceService } from '../game-service/game-service.service';
import { EditPlayerComponent } from '../player/edit-player/edit-player.component';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']

})
export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  
  screenWidth = window.innerWidth;

 
  gameSubscription: any;


  // items$;
  // items;




  constructor(public dialog: MatDialog, private route: ActivatedRoute, public gameService:GameServiceService, ) {
  
    // this.subGamesListWidthItemMethod();
    // this.items$ = collectionData(this.getGameRef());
    // this.items = this.items$.subscribe((list) => {
    //   list.forEach(element => {
    //   this.games.push(element);
    //   });
    // });

  }

      ngOnInit(): void {
        this.route.params.subscribe((params)=> {
          this.gameService.gameId = params['id'];
          console.log(this.gameService.gameId);
    
        
        })
    
        
      }
  @ViewChild(GameDescriptionComponent, { static: false }) gameDescription!: GameDescriptionComponent;





  pickCard() {
    if (this.gameService.game.players.length >= 2) {
      console.log(this.gameService.game.players.length);
      this.gameDescription.readyToStart = true;
      const card = this.gameService.game.stack.pop();
      if (card !== undefined && !this.gameService.game.pickCardAnimation) {
        this.gameService.game.currentCard = card;
        this.playAudio();
        this.gameService.game.pickCardAnimation = true;
      }
      this.pushCurrentCard();
    } else {
      this.gameDescription.readyToStart = false;
    }
   
  }

  pushCurrentCard() {
    setTimeout(() => {
      this.gameService.game.playedCard.push(this.gameService.game.currentCard);
      this.gameService.game.pickCardAnimation = false;
      this.checkNextPlayer();
    }, 2000)
  }


  
 


  playAudio() {
    let audio = new Audio();
    audio.src = "assets/card-sound.mp3";
    audio.load();
    audio.play();
  }


  checkNextPlayer() {
    if (this.gameService.game.currentPlayer == this.gameService.game.players.length - 1) {
      this.gameService.game.currentPlayer = 0;
    } else if (this.gameService.game.pickCardAnimation == false) {
      this.gameService.game.currentPlayer++;
    }
    this.gameService.updateGame();
    console.log(this.gameService.gameId)
   
    
  }

  get cardArray(): number[] {
    const maxCards = 5;
    let start = Math.max(maxCards - this.gameService.game.stack.length, 0);
    if (this.gameService.game.stack.length == 0) {
      setTimeout(() => {
        this.gameService.game.gameOver = true;
      }, 3000)
    }
    return [1, 2, 3, 4, 5].slice(start);

  }


  
 

openDialog(): void {
  const dialogRef = this.dialog.open(DialogAddPlayerComponent);
  dialogRef.afterClosed().subscribe((name: string) => {
    if (name && name.trim() !== '' && this.gameService.game.players.length < 10) {
      this.gameService.game.players.push({name:name, picture: this.gameService.picSrc});
      console.log("Neuer Spieler:",this.gameService.game.players);
    }
  });
}

}


