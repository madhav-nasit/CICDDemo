import 'react-native-gesture-handler/jestSetup';

// Silence useNativeDriver warning in tests
const originalConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('useNativeDriver')) {
    return;
  }
  originalConsoleError(...args);
};

// Mock InteractionManager to avoid teardown animation errors from @react-navigation/stack
// eslint-disable-next-line no-undef
jest.mock('react-native/Libraries/Interaction/InteractionManager', () => {
  // eslint-disable-next-line no-undef
  const Actual = jest.requireActual(
    'react-native/Libraries/Interaction/InteractionManager',
  );
  return {
    ...Actual,
    runAfterInteractions: task => {
      if (typeof task === 'function') {
        task();
      } else if (task && typeof task.gen === 'function') {
        task.gen();
      }
      return { then: cb => cb && cb() };
    },
    createInteractionHandle: () => 1,
    clearInteractionHandle: () => {},
    setDeadline: () => {},
  };
});
