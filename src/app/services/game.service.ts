import { Injectable } from '@angular/core';
import {RoundData} from '../models/round-data.model';
import {Result} from '../models/enums/result.enum';
import {Card} from '../models/card.model';
import {AlertService} from './alert.service';
import {RoundService} from './round.service';
import {CardsMapper} from '../models/mappers/cards.mapper';
import {SwapiService} from '../http/swapi.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private swapiService: SwapiService,
    private cardsMapper: CardsMapper,
    private roundService: RoundService,
  ) {
  }

  private static compareResources(cards: Card[], comparator: string) {
    if (!cards[0].hasOwnProperty(comparator) || !cards[0].hasOwnProperty(comparator)) {
      AlertService.displayGenericAlert();
      throw new Error(`Property ${comparator} does not exist on type ${cards[0].constructor.name}`);
    } else {
      if (cards[0][comparator] > cards[1][comparator]) {
        return [Result.WIN, Result.LOSS];
      } else if (cards[0][comparator] < cards[1][comparator]) {
        return [Result.LOSS, Result.WIN];
      } else {
        return [Result.DRAW, Result.DRAW];
      }
    }
  }

  playRound(resourceType: string): void {
    this.roundService.startRound();
    this.swapiService.getTwoRandomCardsOfType(resourceType)
      .subscribe(
        (resources) => {
          if (resources) {
            try {
              const comparedAttribute = this.getComparator(resourceType);
              const result = GameService.compareResources(resources, comparedAttribute);
              this.roundService.endRoundWithSuccess(new RoundData(resources, result, resourceType, comparedAttribute));
            } catch (e) {
              this.roundService.endRoundWithFailure();
            }
          } else {
            this.roundService.endRoundWithFailure();
          }
        }
      );
  }

  resetGame(): void {
    this.roundService.clearRounds();
  }

  private getComparator(resourceType: string) {
    return this.cardsMapper.getRandomComparableForType(resourceType);
  }
}

