import {StarshipsFactory} from '../starships.factory';
import {Card} from '../../app/models/card.model';
import {Observable, of} from 'rxjs';

export class SwapiServiceStub {

  getTwoRandomCardsOfType(roundType: string): Observable<Card[]> {
    return of([StarshipsFactory.getStarshipWithSmallCrew(), StarshipsFactory.getStarshipWithBigCrew()]);
  }
}
