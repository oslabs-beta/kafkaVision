import { jest } from '@jest/globals';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale,
  PointElement,
  LineElement,  
  BarElement,
  BarController,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

export const chart.js = () => {
  return {
    Chart: () => null,
    CategoryScale: () => null,
    BarElement: () => null,
    BarController: () => null,
    LineElement: () => null,
    LinearScale: () => null,
    PointElement: () => null,
    Title: () => null,
    Tooltip: () => null,
    Legend: () => null,
  };
};