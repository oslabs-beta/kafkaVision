import '@testing-library/jest-dom';
import { jest } from '@jest/globals';


jest.mock('react-chartjs-2', () => ({
  Bar: () => null, // add any additional chart types here
  Line: () => null,
}));

jest.mock('chart.js');
