import {toNumberOrZero} from './to-number';

describe('toNumberOrZero', () => {
  it('should return number if string is a number', () => {
    expect(toNumberOrZero('89')).toEqual(89);
  });

  it('should return zero if string is not a number', () => {
    expect(toNumberOrZero('aaa')).toEqual(0);
  });

  it('should return zero if string is undefined', () => {
    expect(toNumberOrZero(undefined)).toEqual(0);
  });

  it('should return zero if string is null', () => {
    expect(toNumberOrZero(null)).toEqual(0);
  });
});
