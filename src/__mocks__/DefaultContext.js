import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

export const store = {
  globalState: null,
  connectionState: false,
  setGlobalState: jest.fn(),
  setConnectionState: jest.fn(),
};
