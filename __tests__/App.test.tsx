/**
 * @format
 */

import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import App from '../App';

test('renders App and unmounts without errors', () => {
  jest.useFakeTimers();
  let tree: ReactTestRenderer.ReactTestRenderer;
  act(() => {
    tree = ReactTestRenderer.create(<App />);
  });
  act(() => {
    jest.runOnlyPendingTimers();
  });
  act(() => {
    tree.unmount();
  });
});
