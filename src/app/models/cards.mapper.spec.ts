import {TestBed} from '@angular/core/testing';
import {CardsMapper} from './cards.mapper';
import {Starship} from './starship.model';

describe('CardMapper', () => {
  const cardTypes = ['starships', 'people'];
  const starshipAttributes = ['costInCredits', 'length', 'crew', 'passengers', 'cargoCapacity', 'MGLT', 'films'];
  let cardsMapper: CardsMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ CardsMapper ]
    });
    cardsMapper = TestBed.get(CardsMapper);
  });

  describe('getAllCardTypes', () => {
    it('should return an array of card types', () => {
      expect(cardsMapper.getAllCardTypes()).toEqual(cardTypes);
    });
  });

  describe('getRandomComparableForType', () => {
    it('should return random attribute to compare for card type', () => {
      expect(starshipAttributes.includes(cardsMapper.getRandomComparableForType('starships'))).toBe(true);
    });

    it('should return null if card type does not exist', () => {
      expect(cardsMapper.getRandomComparableForType('test')).toBeNull();
    });
  });

  describe('getRandomCardType', () => {
    it('should return random card type', () => {
      expect(cardsMapper.getAllCardTypes().includes(cardsMapper.getRandomCardType())).toBe(true);
    });
  });

  describe('mapCardTypeToModel', () => {
    it('should return Card object of specified type', () => {
      expect(cardsMapper.mapCardTypeToModel('starships') instanceof Starship).toBe(true);
    });

    it('should return null if card type does not exist', () => {
      expect(cardsMapper.mapCardTypeToModel('test')).toBeNull();
    });
  });
});
