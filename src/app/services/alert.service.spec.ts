import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('displayGenericAlert', () => {
    it('should display alert with generic message', () => {
      spyOn(window, 'alert');
      AlertService.displayGenericAlert();
      expect(window.alert).toHaveBeenCalledWith('Something went wrong, please try again.');
    });
  });
});
