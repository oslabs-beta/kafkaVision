import { jest } from '@jest/globals';

export default jest.mock('react-chartjs-2', () => ({
  Bar: () => null,
}));
