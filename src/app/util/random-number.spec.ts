import {getRandomNumberInRange} from './random-number';

describe('getRandomNumberInRange', () => {
  it('should return number in declared range', () => {
    const num = getRandomNumberInRange(7, 9);
    const result = num >= 7 && num < 9;
    expect(result).toBe(true);
  });
});
