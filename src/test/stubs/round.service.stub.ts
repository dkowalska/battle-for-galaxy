import {Observable, of} from 'rxjs';
import {Round} from '../../app/models/round.model';
import {RoundData} from '../../app/models/round-data.model';

export class RoundServiceStub {
  clearRounds(): void {}

  getRound(): Observable<Round> {
    return of(null);
  }

  endRoundWithSuccess(roundData: RoundData): void {}

  startRound(): void {}

  endRoundWithFailure(): void {}
}
