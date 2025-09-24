/**
 * @format
 */

import App from '../App';

describe('App Component', () => {
  it('should render without throwing', () => {
    expect(() => {
      require('../App');
    }).not.toThrow();
  });

  it('should export a function', () => {
    expect(typeof App).toBe('function');
  });

  it('should be able to instantiate App', () => {
    const element = App();
    expect(element).toBeTruthy();
  });
});
