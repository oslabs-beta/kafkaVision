import React from 'react';
import { store } from './DefaultContext';
import { appContext } from '../App';

export const StateProvider = ({ children }) => {
  return <appContext.Provider value={store}>{children}</appContext.Provider>;
};
