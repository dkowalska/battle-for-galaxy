import {Starship} from '../starship.model';
import {Person} from '../person.model';
import {Injectable} from '@angular/core';
import {getRandomNumberInRange} from '../../util/random-number';
import {Card} from '../card.model';
import {Planet} from '../planet.model';
import {Film} from '../film.model';
import {Species} from '../species.model';
import {Vehicle} from '../vehicle.model';

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
    },
    planets: {
      cardModel: Planet,
      comparableAttributes: ['rotationPeriod', 'orbitalPeriod', 'diameter', 'surfaceWater', 'population', 'residents', 'films']
    },
    films: {
      cardModel: Film,
      comparableAttributes: ['characters', 'planets', 'vehicles', 'species', 'starships']
    },
    species: {
      cardModel: Species,
      comparableAttributes: ['averageHeight', 'averageLifespan', 'people', 'films']
    },
    vehicles: {
      cardModel: Vehicle,
      comparableAttributes: ['costInCredits', 'length', 'crew', 'passengers', 'cargoCapacity', 'films']
    }
  };

  getAllCardTypes(): string[] {
    return Object.keys(this.cardsMap);
  }

  getRandomComparableForType(type: string): string {
    if (this.getAllCardTypes().includes(type)) {
      const randomIndex = getRandomNumberInRange(0, this.cardsMap[type].comparableAttributes.length);
      return this.cardsMap[type].comparableAttributes[randomIndex];
    }
    return null;
  }


  getRandomCardType(): string {
    return this.getAllCardTypes()[getRandomNumberInRange(0, Object.keys(this.cardsMap).length)];
  }

  mapCardTypeToModel(type: string): Card {
    if (this.getAllCardTypes().includes(type)) {
      return new this.cardsMap[type].cardModel();
    }
    return null;
  }
}
