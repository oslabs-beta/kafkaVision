import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
} from 'chart.js';

jest.mock('react-chartjs-2', () => ({
  Bar: () => null, // add any additional chart types here
  Line: () => null,
}));

jest.mock('chart.js');
