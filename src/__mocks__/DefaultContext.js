import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

export const store = {
  globalState: null,
  connectionState: null,
  setGlobalState: jest.fn(),
  setConnectionState: jest.fn(),
};
