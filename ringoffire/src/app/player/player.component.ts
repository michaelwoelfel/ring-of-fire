import { Component, OnInit, Input } from '@angular/core';
import { GameServiceService } from '../game-service/game-service.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() name:string = '';
  @Input() playerActive: boolean = false;
  @Input() picture:string = '';
  constructor(public gameService: GameServiceService) {
   
  }

  ngOnInit(): void {

  }

}
