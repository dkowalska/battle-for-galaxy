import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GameComponent} from './game.component';
import {Component} from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GameService} from '../../services/game.service';
import {RoundService} from '../../services/round.service';
import {CardsMapper} from '../../models/mappers/cards.mapper';
import {CardsMapperStub} from '../../../test/stubs/cards.mapper.stub';
import {GameServiceStub} from '../../../test/stubs/game.service.stub';
import {defer, of} from 'rxjs';
import {Round} from '../../models/round.model';
import {Status} from '../../models/enums/status.enum';
import {RoundData} from '../../models/round-data.model';
import {Result} from '../../models/enums/result.enum';

@Component({
  selector: 'bftg-card',
  template: '<p>Mock Card Component</p>'
})
class MockCardComponent {}

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        MockCardComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule
      ],
      providers: [
        {provide: GameService, useClass: GameServiceStub},
        {provide: RoundService, useValue: {
            getRound() { return of(null); }
          }},
        {provide: CardsMapper, useClass: CardsMapperStub}
      ]
    });
  }));

  describe('game controls', () => {
    let gameService: GameService;

    beforeEach(() => {
      TestBed.compileComponents();
      fixture = TestBed.createComponent(GameComponent);
      component = fixture.componentInstance;
      gameService = TestBed.get(GameService);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should change current card type if new card type is selected', async () => {
      // TO DO
    });

    it('should reset game if reset game button is clicked', () => {
      // given
      spyOn(gameService, 'resetGame');
      const button = fixture.debugElement.nativeElement.querySelector('.control-panel__button--reset-game');
      // when
      button.click();
      // then
      expect(gameService.resetGame).toHaveBeenCalled();
    });

    it('should start round if play round button is clicked', () => {
      // given
      spyOn(gameService, 'playRound');
      const button = fixture.debugElement.nativeElement.querySelector('.control-panel__button--play-round');
      // when
      button.click();
      // then
      expect(gameService.playRound).toHaveBeenCalledWith('starships');
    });
  });

  describe('round handling', () => {
    let roundService: RoundService;

    it('should reset score and current card type if game was reset', async (async () => {
      // given
      setEnvironment(null);
      component.changeSelectedCardType('people');
      component.score = [1, 1];
      fixture.detectChanges();

      const score = fixture.debugElement.nativeElement.querySelector('.score-panel__score');
      expect(component.selectedCardType).toEqual('people');
      expect(score.innerText).toEqual('1 : 1');
      // when
      await fixture.whenStable().then(() => {
        fixture.detectChanges();
        // then
        expect(component.selectedCardType).toEqual('random');
        expect(score.innerText).toEqual('0 : 0');
      });
    }));

    it('should disable game controls if round is in progress', async (async () => {
      // given
      setEnvironment(new Round(Status.IN_PROGRESS, null));
      const resetGameButton = fixture.debugElement.nativeElement.querySelector('.control-panel__button--reset-game');
      const playRoundButton = fixture.debugElement.nativeElement.querySelector('.control-panel__button--play-round');

      expect(resetGameButton.disabled).toBeFalsy();
      expect(playRoundButton.disabled).toBeFalsy();
      // when
      await fixture.whenStable().then(() => {
        fixture.detectChanges();
        // then
        expect(resetGameButton.disabled).toBeTruthy();
        expect(playRoundButton.disabled).toBeTruthy();
      });

    }));

    it('should enable game controls and not change score if round fails', async (async () => {
      // given
      setEnvironment(new Round(Status.FAILURE, null));
      const resetGameButton = fixture.debugElement.nativeElement.querySelector('.control-panel__button--reset-game');
      const playRoundButton = fixture.debugElement.nativeElement.querySelector('.control-panel__button--play-round');
      const score = fixture.debugElement.nativeElement.querySelector('.score-panel__score');

      resetGameButton.disabled = true;
      playRoundButton.disabled = true;
      score.innerText = '1 : 1';
      component.roundInProgress = true;
      fixture.detectChanges();
      // when
      await fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(resetGameButton.disabled).toBeFalsy();
        expect(playRoundButton.disabled).toBeFalsy();
        expect(score.innerText).toEqual('1 : 1');
        expect(component.roundInProgress).toEqual(false);
      });
    }));

    it('should enable game controls and change score if round succeeds', async (async () => {
      // given
      setEnvironment(new Round(Status.SUCCESS, new RoundData([null, null], [Result.WIN, Result.LOSS], null, null)));
      const resetGameButton = fixture.debugElement.nativeElement.querySelector('.control-panel__button--reset-game');
      const playRoundButton = fixture.debugElement.nativeElement.querySelector('.control-panel__button--play-round');
      const score = fixture.debugElement.nativeElement.querySelector('.score-panel__score');

      resetGameButton.disabled = true;
      playRoundButton.disabled = true;
      component.roundInProgress = true;
      fixture.detectChanges();
      // when
      await fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(resetGameButton.disabled).toBeFalsy();
        expect(playRoundButton.disabled).toBeFalsy();
        expect(score.innerText).toEqual('1 : 0');
        expect(component.roundInProgress).toEqual(false);
      });
    }));

    function setEnvironment(round: Round): void {
      TestBed.overrideProvider(RoundService, {useValue: {
          getRound() { return defer(() => Promise.resolve(round)); }
        }});
      TestBed.compileComponents();
      fixture = TestBed.createComponent(GameComponent);
      component = fixture.componentInstance;
      roundService = TestBed.get(RoundService);
      fixture.detectChanges();
    }
  });
});
