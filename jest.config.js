module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-gesture-handler|react-native-screens|react-redux|@react-navigation|@react-native-community)/)',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
