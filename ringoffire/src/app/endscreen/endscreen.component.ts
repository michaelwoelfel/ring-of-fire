import { Component, OnInit } from '@angular/core';
import { GameServiceService } from '../game-service/game-service.service';

@Component({
  selector: 'app-endscreen',
  templateUrl: './endscreen.component.html',
  styleUrls: ['./endscreen.component.scss']
})
export class EndscreenComponent implements OnInit {

  constructor(private gameService: GameServiceService) {
    
  }

  ngOnInit(): void {
 
  }
restartGame() {
 this.gameService.newGame();
}

}
