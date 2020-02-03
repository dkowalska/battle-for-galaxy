import {TestBed} from '@angular/core/testing';
import {SwapiService} from './swapi.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CardsMapper} from '../models/cards.mapper';
import {CardsMapperStub} from '../../test/stubs/cards.mapper.stub';
import {AlertService} from '../services/alert.service';
import {LoggerService} from '../services/logger.service';

describe('SwapiService', () => {
  const CARD_TYPE = 'starships';
  const API_STARSHIPS_URL = 'https://swapi.co/api/starships';

  let httpMock: HttpTestingController;
  let service: SwapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SwapiService,
        {provide: CardsMapper, useClass: CardsMapperStub},
      ]
    });
    service = TestBed.get(SwapiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTwoRandomCardsOfType', () => {

    it('should return two instances of Card', () => {
      // TO DO
    });

    it('should return null if first response from api is an error', (done: DoneFn) => {
      stubAlertingAndLogger();
      service.getTwoRandomCardsOfType(CARD_TYPE).subscribe((data) => {
        expect(data).toEqual(null);
        done();
      });

      const mockRequest = httpMock.expectOne(API_STARSHIPS_URL);

      mockRequest.error(new ErrorEvent('ERROR_STUB'));
      httpMock.verify();
    });

    it('should return null if first response from api is empty', (done: DoneFn) => {
      stubAlertingAndLogger();
      service.getTwoRandomCardsOfType(CARD_TYPE).subscribe((data) => {
        expect(data).toEqual(null);
        done();
      });

      checkRequestAndStubResponse(API_STARSHIPS_URL, null);
    });

    it('should return null if first response from api has no count', (done: DoneFn) => {
      stubAlertingAndLogger();
      service.getTwoRandomCardsOfType(CARD_TYPE).subscribe((data) => {
        expect(data).toEqual(null);
        done();
      });

      checkRequestAndStubResponse(API_STARSHIPS_URL, {});
    });
  });

  function stubAlertingAndLogger() {
    spyOn(AlertService, 'displayGenericAlert').and.callFake(() => {});
    spyOn(LoggerService, 'logError').and.callFake(() => {});
  }

  function checkRequestAndStubResponse(uri: string, mockBody: any) {
    const mockRequest = httpMock.expectOne(uri);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    expect(mockRequest.request.method).toEqual('GET');
    mockRequest.flush(mockBody);
    httpMock.verify();
  }
});
