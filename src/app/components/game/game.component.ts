import {Component, OnInit} from '@angular/core';
import {SwapiService} from '../../http/swapi.service';

@Component({
  selector: 'bftg-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  roundInProgress = false;

  constructor(private swapiService: SwapiService) { }

  ngOnInit() {
    this.swapiService.getTwoRandomCardsOfType('starships').subscribe(
      (result) => console.log(result)
    );
  }

  resetGame() {
    
  }

  playRound() {
    
  }
}
