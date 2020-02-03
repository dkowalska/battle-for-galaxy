import {Card} from './card.model';
import {Result} from './enums/result.enum';

export class RoundData {
  cards: Card[];
  results: Result[];
  resourceName: string;
  comparedAttribute: string;

  constructor(cards: Card[], results: Result[], resourceName: string, comparedAttribute: string) {
    this.cards = cards;
    this.results = results;
    this.resourceName = resourceName;
    this.comparedAttribute = comparedAttribute;
  }
}
