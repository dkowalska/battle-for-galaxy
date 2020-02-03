import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  static logError(err: Error): void {
    console.error(err);
  }
}
