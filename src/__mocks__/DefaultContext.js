import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import initialState from '../initialState';

const setGlobalState = jest.fn();
const setConnectionState = jest.fn();
const {dummyGlobalState:globalState, dummyConnectionState:connectionState} = initialState;


export const providerProps = {
  state: { globalState, connectionState },
  actions: { setGlobalState, setConnectionState },
};
