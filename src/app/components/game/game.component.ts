import {Component, OnInit} from '@angular/core';
import {Result} from '../../models/enums/result.enum';
import {Status} from '../../models/enums/status.enum';
import {Round} from '../../models/round.model';
import {CardsMapper} from '../../models/mappers/cards.mapper';
import {RoundService} from '../../services/round.service';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'bftg-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  cardTypes: string[];
  selectedCardType: string;
  score: number[];
  roundInProgress = false;

  constructor(
    private gameService: GameService,
    private roundService: RoundService,
    private cardsMapper: CardsMapper
  ) {
    this.initializeGameData();
  }

  ngOnInit(): void {
    this.roundService.getRound().subscribe((round) => this.updateGameData(round));
  }

  changeSelectedCardType(value: string) {
    this.selectedCardType = value;
  }

  playRound() {
    this.gameService.playRound(this.getCardType());
  }

  resetGame() {
    this.gameService.resetGame();
  }

  private initializeGameData() {
    this.resetGameData();
    this.cardTypes = [this.selectedCardType, ...this.cardsMapper.getAllCardTypes()];
  }

  private blockControls(): void {
    this.roundInProgress = true;
  }

  private getCardType(): string {
    return this.selectedCardType === 'random' ? this.cardsMapper.getRandomCardType() : this.selectedCardType;
  }

  private resetGameData() {
    this.score = [0, 0];
    this.selectedCardType = 'random';
  }

  private updateGameData(round: Round): void {
    if (round) {
      if (round.status === Status.IN_PROGRESS) {
        this.blockControls();
      } else {
        this.unblockControls();
        if (round.status === Status.SUCCESS) {
          this.updateScore(round.roundData.results);
        }
      }
    } else {
      this.resetGameData();
    }
  }

  private unblockControls(): void {
    this.roundInProgress = false;
  }

  private updateScore(results: Result[]): void {
    this.score = this.score.map((value, index) => value + results[index]);
  }
}
