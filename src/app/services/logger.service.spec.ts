import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('logError', () => {
    it('should log error to console', () => {
      spyOn(console, 'error');
      const err = new Error('test error');
      LoggerService.logError(err);
      expect(console.error).toHaveBeenCalledWith(err);
    });
  });
});
