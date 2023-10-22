import { Component,Input,Output,EventEmitter,ViewChild } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { GameServiceService } from '../game-service/game-service.service';




@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})


export class EditPlayerComponent {
 


constructor(public gameService: GameServiceService) {

}

  

}
