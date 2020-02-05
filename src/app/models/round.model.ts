import {RoundData} from './round-data.model';
import {Status} from './enums/status.enum';

export class Round {
  status: Status;
  roundData: RoundData;

  constructor(status, roundData: RoundData = null) {
    this.status = status;
    this.roundData = roundData;
  }
}
