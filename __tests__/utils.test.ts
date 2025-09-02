import { addTwoDigits } from '../src/utils';

describe('addTwoDigits', () => {
  it('adds two positive digits', () => {
    expect(addTwoDigits(2, 3)).toBe(5);
  });

  it('adds zero and a digit', () => {
    expect(addTwoDigits(0, 7)).toBe(7);
  });

  it('adds two zeros', () => {
    expect(addTwoDigits(0, 0)).toBe(0);
  });

  it('adds negative and positive digit', () => {
    expect(addTwoDigits(-2, 5)).toBe(3);
  });
});
