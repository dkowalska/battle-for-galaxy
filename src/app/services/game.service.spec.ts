import {TestBed} from '@angular/core/testing';
import {GameService} from './game.service';
import {CardsMapper} from '../models/mappers/cards.mapper';
import {CardsMapperStub} from '../../test/stubs/cards.mapper.stub';
import {RoundService} from './round.service';
import {SwapiService} from '../http/swapi.service';
import {RoundServiceStub} from '../../test/stubs/round.service.stub';
import {SwapiServiceStub} from '../../test/stubs/swapi.service.stub';
import {of} from 'rxjs';
import {StarshipsFactory} from '../../test/starships.factory';
import {RoundData} from '../models/round-data.model';
import {Result} from '../models/enums/result.enum';

describe('GameService', () => {
  let service: GameService;
  let roundService: RoundService;
  let swapiService: SwapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameService,
        {provide: SwapiService, useClass: SwapiServiceStub},
        {provide: CardsMapper, useClass: CardsMapperStub},
        {provide: RoundService, useClass: RoundServiceStub}
      ]
    });
    service = TestBed.get(GameService);
    roundService = TestBed.get(RoundService);
    swapiService = TestBed.get(SwapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('resetGame', () => {
    it('should use RoundService to send empty round', () => {
      // given
      spyOn(roundService, 'clearRounds');
      // when
      service.resetGame();
      // then
      expect(roundService.clearRounds).toHaveBeenCalled();
    });
  });

  describe('playRound', () => {
    it('should signal round failure if cards data is empty', () => {
      // given
      spyOn(swapiService, 'getTwoRandomCardsOfType').and.returnValue(of(null));
      spyOn(roundService, 'endRoundWithFailure');
      // when
      service.playRound('starships');
      // then
      expect(roundService.endRoundWithFailure).toHaveBeenCalled();
    });

    it('should signal round success and win of player one if card one is better', () => {
      // given
      const cards = [StarshipsFactory.getStarshipWithBigCrew(), StarshipsFactory.getStarshipWithSmallCrew()];
      spyOn(swapiService, 'getTwoRandomCardsOfType').and.returnValue(of(cards));
      spyOn(roundService, 'endRoundWithSuccess');
      const roundData = new RoundData(cards, [Result.WIN, Result.LOSS], 'starships', 'crew');
      // when
      service.playRound('starships');
      // then
      expect(roundService.endRoundWithSuccess).toHaveBeenCalledWith(roundData);
    });

    it('should signal round success and loss of player one if card one is worse', () => {
      // given
      const cards = [StarshipsFactory.getStarshipWithSmallCrew(), StarshipsFactory.getStarshipWithBigCrew()];
      spyOn(roundService, 'endRoundWithSuccess');
      const roundData = new RoundData(cards, [Result.LOSS, Result.WIN], 'starships', 'crew');
      // when
      service.playRound('starships');
      // then
      expect(roundService.endRoundWithSuccess).toHaveBeenCalledWith(roundData);
    });

    it('should signal round success and draw both cards are equal', () => {
      // given
      const cards = [StarshipsFactory.getStarshipWithBigCrew(), StarshipsFactory.getStarshipWithBigCrew()];
      spyOn(swapiService, 'getTwoRandomCardsOfType').and.returnValue(of(cards));
      spyOn(roundService, 'endRoundWithSuccess');
      const roundData = new RoundData(cards, [Result.DRAW, Result.DRAW], 'starships', 'crew');
      // when
      service.playRound('starships');
      // then
      expect(roundService.endRoundWithSuccess).toHaveBeenCalledWith(roundData);
    });
  });
});
