import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../models/card.model';
import {RoundService} from '../../services/round.service';
import {Round} from '../../models/round.model';
import {Status} from '../../models/enums/status.enum';
import {Result} from '../../models/enums/result.enum';

@Component({
  selector: 'bftg-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() playerNumber: number;
  showCardContent: boolean;
  roundInProgress: boolean;
  winningCard: boolean;
  cardContent: Card;
  cardType: string;
  comparedAttribute: string;

  constructor(private roundService: RoundService) {
    this.initializeCardData();
  }

  private static isWinningCard(result: Result) {
    return result !== Result.LOSS;
  }

  ngOnInit(): void {
    this.roundService.getRound().subscribe((round) => this.updateCardData(round));
  }

  getCardContentKeys(): string[] {
    return Object.keys(this.cardContent);
  }

  private updateCardData(round: Round) {
    if (round) {
      if (round.status === Status.IN_PROGRESS) {
        this.showCardContent = true;
        this.roundInProgress = true;
      } else {
        this.roundInProgress = false;
        if (round.status === Status.SUCCESS) {
          this.setCardData(
            CardComponent.isWinningCard(round.roundData.results[this.playerNumber - 1]),
            round.roundData.cards[this.playerNumber - 1],
            round.roundData.resourceName,
            round.roundData.comparedAttribute);
        } else {
          this.showCardContent = false;
        }
      }
    } else {
      this.initializeCardData();
    }
  }

  private initializeCardData() {
    this.showCardContent = false;
    this.roundInProgress = false;
    this.winningCard = false;
    this.cardContent = null;
    this.cardType = null;
    this.comparedAttribute = null;
  }

  private setCardData(winningCard: boolean, cardContent: Card, cardType: string, comparedAttribute: string) {
    this.winningCard = winningCard;
    this.cardContent = cardContent;
    this.cardType = cardType;
    this.comparedAttribute = comparedAttribute;
  }
}
