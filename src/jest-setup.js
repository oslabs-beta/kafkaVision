import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

jest.mock('react-chartjs-2', () => ({
  Bar: () => null,
}));

jest.mock('chart.js', () => ({
  Chart: () => null,
  CategoryScale: () => null,
  BarElement: () => null,
  BarController: () => null,
  Title: () => null,
  Tooltip: () => null,
  Legend: () => null,
}));
