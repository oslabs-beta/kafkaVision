/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

// use ts-jest to compile ts to js with ESM support, perform type check, and execute compiled js

module.exports = {
  // .ts, .tsx, .js, .jsx, .mjs files will be transformed with ts-jest to ESM syntax:
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./jest-setup.js'],
  // passing empty transform prevents babel from transforming files:
  transform: {
    // '^.+\\.js$': 'babel-jest',
  },
  // required global settings to use ESM with ts-jest:
  globals: {
    'ts-jest': {
      diagnostics: true,
      useESM: true,
      tsconfig: './tsconfig.json',
    },
  },
  // troubleshooting steps from ts-jest https://github.com/kulshekhar/ts-jest/blob/main/TROUBLESHOOTING.md
  // cannot find module "" from ""
  // {NOT WORKING - possible bug solved in new version: https://github.com/facebook/jest/issues/9771}
  // roots: ['.'],
  // moduleDirectories: ['./node_modules'],
  // modulePaths: ['./chart.js'],

  // jest -- module mapping:

  // if problem is chart.js files need to be transformed, this should allow chartjs module to be transformed and executed by ts-jest {NOT WORKING - suspect this is not the issue}
  //transformIgnorePatterns: ['./node_modules/(?!(chart.js|react-chartjs-2)/)'],
  // if not using preset, pass files to use ESM syntax here:
  //extensionsToTreatAsEsm: ['.tsx', '.ts'],
};
