/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      useESM: true,
      stringifyContentPathRegex: '\\.(html|svg)$',
      tsconfig: './tsconfig.json',
    },
  },
  // globalSetup: './__tests__/jest-setup.js',
  // globalTeardown: './__tests__/jest-teardown.js',
  
  extensionsToTreatAsEsm: ['.tsx'],
};
