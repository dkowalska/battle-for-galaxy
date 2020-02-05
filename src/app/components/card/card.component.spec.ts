import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CardComponent} from './card.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule, MatDividerModule, MatProgressSpinnerModule} from '@angular/material';
import {RoundService} from '../../services/round.service';
import {defer, of} from 'rxjs';
import {Round} from '../../models/round.model';
import {Status} from '../../models/enums/status.enum';
import {RoundData} from '../../models/round-data.model';
import {StarshipsFactory} from '../../../test/starships.factory';
import {Result} from '../../models/enums/result.enum';
import {UnknownPipe} from '../../pipes/is-unknown.pipe';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let roundService: RoundService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent,
        UnknownPipe
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatDividerModule
      ],
      providers: [
        {provide: RoundService, useValue: {
            getRound() { return of(null); }
          }},
      ]
    });
  }));

  it('should create', () => {
    setEnvironment(null);
    expect(component).toBeDefined();
  });

  it('should display empty card', () => {
    setEnvironment(null);
    const cardUnknown = fixture.debugElement.nativeElement.querySelector('.card__content--unknown');
    expect(cardUnknown).not.toBeNull();
  });

  it('should render unknown card if game was reset', async (async () => {
    // given
    setEnvironment(null);
    component.showCardContent = true;
    component.roundInProgress = true;
    // when
    fixture.detectChanges();
    let cardUnknown = fixture.debugElement.nativeElement.querySelector('.card__content--unknown');
    expect(cardUnknown).toBeNull();
    await fixture.whenStable().then(() => {
      fixture.detectChanges();
      cardUnknown = fixture.debugElement.nativeElement.querySelector('.card__content--unknown');
      // then
      expect(cardUnknown).not.toBeNull();
    });
  }));

  it('should render spinner if round is in progress', async (async () => {
    // given
    setEnvironment(new Round(Status.IN_PROGRESS, null));
    // when
    fixture.detectChanges();
    let spinner = fixture.debugElement.nativeElement.querySelector('.mat-progress-spinner');
    expect(spinner).toBeNull();
    await fixture.whenStable().then(() => {
      fixture.detectChanges();
      spinner = fixture.debugElement.nativeElement.querySelector('.mat-progress-spinner');
      // then
      expect(spinner).not.toBeNull();
    });
  }));

  it('should render unknown card if round fails', async (async () => {
    // given
    setEnvironment(new Round(Status.FAILURE, null));
    component.showCardContent = true;
    component.roundInProgress = true;
    // when
    fixture.detectChanges();
    let cardUnknown = fixture.debugElement.nativeElement.querySelector('.card__content--unknown');
    expect(cardUnknown).toBeNull();
    await fixture.whenStable().then(() => {
      fixture.detectChanges();
      cardUnknown = fixture.debugElement.nativeElement.querySelector('.card__content--unknown');
      // then
      expect(cardUnknown).not.toBeNull();
    });
  }));

  it('should render card content if round succeeds', async (async () => {
    // given
    const card = StarshipsFactory.getStarshipWithBigCrew();
    const cardType = 'starships';
    const comparedAttribute = 'crew';
    setEnvironment(new Round(Status.SUCCESS, new RoundData([card, null], [Result.WIN, null], cardType, comparedAttribute)));
    component.playerNumber = 1;
    component.showCardContent = true;
    component.roundInProgress = true;
    // when
    fixture.detectChanges();
    let cardHeader = fixture.debugElement.nativeElement.querySelector('.mat-card-header');
    let cardContent = fixture.debugElement.nativeElement.querySelector('.mat-card-content');
    expect(cardHeader).toBeNull();
    expect(cardContent).toBeNull();
    await fixture.whenStable().then(() => {
      fixture.detectChanges();
      // then
      cardHeader = fixture.debugElement.nativeElement.querySelector('.mat-card-header');
      cardContent = fixture.debugElement.nativeElement.querySelector('.mat-card-content');
      const cardTitle = fixture.debugElement.nativeElement.querySelector('.mat-card-title');
      const cardSubtitle = fixture.debugElement.nativeElement.querySelector('.mat-card-subtitle');
      const compared = fixture.debugElement.nativeElement.querySelector('.mat-card-content p');
      const attributesList = fixture.debugElement.nativeElement.querySelectorAll('.card__list li');
      expect(cardHeader).not.toBeNull();
      expect(cardContent).not.toBeNull();
      expect(cardTitle.innerText).toEqual(card.name);
      expect(cardSubtitle.innerText).toEqual(cardType);
      expect(compared.innerText).toEqual(`${comparedAttribute}: ${card.crew}`);
      expect(attributesList.length).toEqual(Object.keys(card).length);
    });
  }));

  function setEnvironment(round: Round): void {
    TestBed.overrideProvider(RoundService, {useValue: {
        getRound() { return defer(() => Promise.resolve(round)); }
      }});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    roundService = TestBed.get(RoundService);
    fixture.detectChanges();
  }
});
