import React from 'react';
import { store } from './DefaultContext';
import { appContext } from '../App';

export const AppContext = ({ children }) => {
  return <appContext.Provider value={store}>{children}</appContext.Provider>;
};
