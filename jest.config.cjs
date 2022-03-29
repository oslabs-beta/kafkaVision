/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

// use ts-jest to compile ts to js with ESM support, perform type check, and execute compiled js

const esModules = ['chart.js', 'react-chartjs-2'].join('|');

module.exports = {
  // .ts, .tsx, .js, .jsx, .mjs files will be transformed with ts-jest to ESM syntax:
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./jest-setup.js'],
  // passing empty transform prevents babel from transforming files:
  transform: {
    // [`(${esModules}).+\\$`]: 'babel-jest',
  },
  // required global settings to use ESM with ts-jest:
  globals: {
    'ts-jest': {
      diagnostics: true,
      useESM: true,
      tsconfig: './tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^chart.js/(.*)$': '<rootDir>/__mocks__/chart.js',
    '\\.(png|jpg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/fileMock.js',
  },
  // troubleshooting steps from ts-jest https://github.com/kulshekhar/ts-jest/blob/main/TROUBLESHOOTING.md
  roots: ['.'],
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: ['<rootDir>'],

  // jest -- module mapping:

  // if problem is chart.js files need to be transformed, this should allow chartjs module to be transformed and executed by ts-jest {NOT WORKING}
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
  // if not using preset, pass files to use ESM syntax here:
  //extensionsToTreatAsEsm: ['.tsx', '.ts'],
};
