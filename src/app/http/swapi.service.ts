import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {Card} from '../models/card.model';
import {getRandomNumberInRange} from '../util/random-number';
import {catchError, map, switchMap} from 'rxjs/operators';
import {LoggerService} from '../services/logger.service';
import {AlertService} from '../services/alert.service';
import {CardsMapper} from '../models/cards.mapper';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private apiUrl = 'https://swapi.co/api';

  constructor(
    private http: HttpClient,
    private cardsMapper: CardsMapper
  ) { }

  private static getRandomCardFromResponse(response): any {
    return response.results[getRandomNumberInRange(0, response.results.length - 1)];
  }

  getTwoRandomCardsOfType(cardType: string): Observable<Card[]> {
    return this.http.get(`${this.apiUrl}/${cardType}`)
      .pipe(
        map((response) => {
          if (!response || !response['count']) {
            throw new Error('Response or resource count missing');
          }
          return Math.ceil(response['count'] / 10);
        }),
        switchMap(nbOfPages => {
          const cards = [
            this.getRandomCardOfType(cardType, nbOfPages),
            this.getRandomCardOfType(cardType, nbOfPages)
          ];

          return forkJoin(cards);
        }),
        catchError(this.handleError(null))
      );
  }

  private getRandomCardOfType(cardType: string, nbOfPages: number): Observable<Card> {
    return this.http.get(`${this.apiUrl}/${cardType}/?page=${getRandomNumberInRange(1, nbOfPages)}`)
      .pipe(
        map(response => {
          if (!response || !response['results']) {
            throw new Error('Response or cards array missing');
          }
          return this.deserializeResource(cardType, SwapiService.getRandomCardFromResponse(response));
        })
      );
  }

  private deserializeResource(cardType: string, json: any): Card {
    return this.cardsMapper.mapCardTypeToModel(cardType).deserialize(json);
  }

  private handleError<T>(result?: T) {
    return (err: any): Observable<T> => {
      LoggerService.logError(err);
      AlertService.displayGenericAlert();
      return of(result as T);
    };
  }
}
