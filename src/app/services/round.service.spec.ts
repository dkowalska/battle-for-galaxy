import { TestBed } from '@angular/core/testing';

import { RoundService } from './round.service';
import {Round} from '../models/round.model';
import {Status} from '../models/enums/status.enum';
import {RoundData} from '../models/round-data.model';
import {Observable} from 'rxjs';

describe('RoundService', () => {
  let service: RoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoundService]
    });
    service = TestBed.get(RoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRound', () => {
    it('should return an Observable', () => {
      expect(service.getRound() instanceof Observable).toBe(true);
    });
  });

  describe('clearRounds', () => {
    it('should add empty message to rounds stream', () => {
      // when
      service.getRound().subscribe(
        (data) => expect(data).toBeUndefined()
      );
      // then
      service.clearRounds();
    });
  });

  describe('startRound', () => {
    it('should add round with status IN_PROGRESS to rounds stream', () => {
      // when
      service.getRound().subscribe(
        (data) => expect(data).toEqual(new Round(Status.IN_PROGRESS, null))
      );
      // then
      service.startRound();
    });
  });

  describe('endRoundWithFailure', () => {
    it('should add round with status FAILURE to rounds stream', () => {
      // when
      service.getRound().subscribe(
        (data) => expect(data).toEqual(new Round(Status.FAILURE, null))
      );
      // then
      service.endRoundWithFailure();
    });
  });

  describe('endRoundWithSuccess', () => {
    it('should add round with status SUCCESS to rounds stream', () => {
      // given
      const roundData = new RoundData(null, null, null, null);
      // when
      service.getRound().subscribe(
        (data) => expect(data).toEqual(new Round(Status.SUCCESS, roundData))
      );
      // then
      service.endRoundWithSuccess(roundData);
    });
  });
});
