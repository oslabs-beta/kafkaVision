/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  // .ts, .tsx, .js, .jsx, .mjs files will be transformed with ts-jest to ESM syntax:
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./jest-setup.js'],
  // passing empty transform prevents babel from transforming files:
  transform: {},
  // required global settings to use ESM with ts-jest:
  globals: {
    'ts-jest': {
      diagnostics: true,
      useESM: true,
      tsconfig: './tsconfig.json',
    },
  },
  moduleNameMapper: {
    '\\.(png|jpg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/fileMock.js',
  },
  roots: ['.'],
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: ['<rootDir>'],
};
