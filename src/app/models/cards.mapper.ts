import {Starship} from './starship.model';
import {Person} from './person.model';
import {Injectable} from '@angular/core';
import {getRandomNumberInRange} from '../util/random-number';
import {Card} from './card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsMapper {
  private cardsMap = {
    starships: {
      cardModel: Starship,
      comparableAttributes: ['costInCredits', 'length', 'crew', 'passengers', 'cargoCapacity', 'MGLT', 'films']
    },
    people: {
      cardModel: Person,
      comparableAttributes: ['height', 'mass', 'films']
    }
  };

  getAllCardTypes(): string[] {
    return Object.keys(this.cardsMap);
  }

  getRandomComparableForType(type: string): string {
    const randomIndex = getRandomNumberInRange(0, this.cardsMap[type].comparableAttributes.length);
    return this.cardsMap[type].comparableAttributes[randomIndex];
  }

  getRandomCardType(): string {
    return this.getAllCardTypes()[getRandomNumberInRange(0, Object.keys(this.cardsMap).length - 1)];
  }

  mapCardTypeToModel(type: string): Card {
    return new this.cardsMap[type].cardModel();
  }
}
