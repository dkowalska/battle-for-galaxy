import { UnknownPipe } from './is-unknown.pipe';

describe('UnknownPipe', () => {
  let pipe: UnknownPipe;

  beforeEach(() => {
    pipe = new UnknownPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return unknown if value is 0', () => {
    expect(pipe.transform(0)).toEqual('unknown');
  });

  it('should return string with value if value is number', () => {
    expect(pipe.transform(45)).toEqual('45');
  });

  it('should return value if value is a string', () => {
    expect(pipe.transform('test')).toEqual('test');

  });

  it('should return empty string if value is neither number nor string', () => {
    expect(pipe.transform(null)).toEqual('');
  });
});
