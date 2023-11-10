import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PlayerComponent } from '../player.component';
import { GameServiceService } from '../../game-service/game-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import {  OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})


export class EditPlayerComponent {
  @Input() picture: string = '';


  constructor(public gameService: GameServiceService, public dialogRef: MatDialogRef<EditPlayerComponent>) {

  }

  playerPictures = ["person.png", "person-female.png", "cat.png", "dog.png"];

  public selectPicture(type: string) {
    let newSrc: string;
    newSrc = "assets/img/"+ type;
    this.gameService.picSrc = newSrc; // Make sure picSrc is available in this component
    console.log(newSrc);
    this.dialogRef.close(newSrc); // you can return the newSrc so that you know which image was selected
  }

}
