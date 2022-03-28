import { jest } from '@jest/globals';

export const mockChartJs = () => {
  return {
    Chart: () => null,
    CategoryScale: () => null,
    BarElement: () => null,
    BarController: () => null,
    Title: () => null,
    Tooltip: () => null,
    Legend: () => null,
  };
};
