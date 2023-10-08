import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-endscreen',
  templateUrl: './endscreen.component.html',
  styleUrls: ['./endscreen.component.scss']
})
export class EndscreenComponent implements OnInit {

  constructor() {
    
  }

  ngOnInit(): void {
 
  }
restartGame() {
  window.location.reload();
}

}
