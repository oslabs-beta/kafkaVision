import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

const setGlobalState = jest.fn();
const setConnectionState = jest.fn();
const connectionState = true;
const globalState = null;

export const providerProps = {
  state: { globalState, connectionState },
  actions: { setGlobalState, setConnectionState },
};