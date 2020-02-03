import {Result} from './result';
import {Card} from './card.model';

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
