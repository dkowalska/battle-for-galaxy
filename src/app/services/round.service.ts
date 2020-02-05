import { Injectable } from '@angular/core';
import {Round} from '../models/round.model';
import {RoundData} from '../models/round-data.model';
import {Status} from '../models/enums/status.enum';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  private round = new Subject<Round>();

  constructor() { }

  clearRounds(): void {
    this.round.next();
  }

  getRound(): Observable<Round> {
    return this.round.asObservable();
  }

  endRoundWithSuccess(roundData: RoundData): void {
    this.round.next(new Round(Status.SUCCESS, roundData));
  }

  startRound(): void {
    this.round.next(new Round(Status.IN_PROGRESS));
  }

  endRoundWithFailure(): void {
    this.round.next(new Round(Status.FAILURE));
  }
}
