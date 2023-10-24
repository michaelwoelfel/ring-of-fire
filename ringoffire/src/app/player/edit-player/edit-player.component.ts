import { Component,Input,Output,EventEmitter,ViewChild } from '@angular/core';
import { PlayerComponent } from '../player.component';
import { GameServiceService } from '../../game-service/game-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})


export class EditPlayerComponent {
  @Input() picture:string = '';


constructor(public gameService: GameServiceService, public dialogRef: MatDialogRef<EditPlayerComponent> ) {

}

public selectPicture(type:string) {
  let newSrc: string;
  if (type == "male") {
    newSrc= "assets/img/person.png";
  } else {
    newSrc = "assets/img/person-female.png";
  }
  this.gameService.picSrc = newSrc; // Make sure picSrc is available in this component
  console.log(newSrc);
  this.dialogRef.close(newSrc); // you can return the newSrc so that you know which image was selected
}

}
