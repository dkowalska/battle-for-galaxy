import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  static displayGenericAlert() {
    alert('Something went wrong, please try again.');
  }
}
