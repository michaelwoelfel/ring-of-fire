import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { Game } from 'src/models/game';
import { GameServiceService } from 'src/app/game-service/game-service.service';


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})

export class StartScreenComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  constructor(private router: Router,   private gameService: GameServiceService) {
   
  }
  ngOnInit(): void {
  }

  async newGame() {
    await this.gameService.newGame();
    await this.gameService.addGame(this.gameService.game.toJson());
   let Id = this.gameService.gameId;
   console.log(Id);
this.router.navigateByUrl('/game/' +Id);
  }

}
