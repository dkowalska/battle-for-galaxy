import {Component, Input} from '@angular/core';

@Component({
  selector: 'bftg-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() playerNumber: number;
  winningCard: true;
  showCardContent: true;
  roundInProgress: false;

  constructor() {
  }
}
