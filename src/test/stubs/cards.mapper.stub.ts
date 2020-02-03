import {Card} from '../../app/models/card.model';
import {Starship} from '../../app/models/starship.model';

export class CardsMapperStub {
  getAllCardTypes(): string[] {
    return ['starships'];
  }

  getRandomComparableForType(type: string): string {
    return 'crew';
  }

  getRandomCardType(): string {
    return 'starships';
  }

  mapCardTypeToModel(type: string): Card {
    return new Starship();
  }
}
