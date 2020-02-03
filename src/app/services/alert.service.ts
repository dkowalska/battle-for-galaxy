import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  static displayGenericAlert(): void {
    alert('Something went wrong, please try again.');
  }
}
