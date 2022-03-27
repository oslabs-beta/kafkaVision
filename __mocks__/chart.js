import { jest } from '@jest/globals';

jest.mock('chart.js', () => ({
  Chart: () => null,
  CategoryScale: () => null,
  BarElement: () => null,
  BarController: () => null,
  Title: () => null,
  Tooltip: () => null,
  Legend: () => null,
}));
