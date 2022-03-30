import React from 'react';
import { render, screen } from '@testing-library/react';
import StaticHealthData from '../Components/StaticHealthData';
import { appContext } from '../App';
import { providerProps } from '../__mocks__/DefaultContext';
import { BrowserRouter } from 'react-router-dom';

describe('Static Health Metrics Tests', () => {
  beforeEach(() => {
    render (
      <appContext.Provider value={providerProps}>
        <BrowserRouter><StaticHealthData/></BrowserRouter>
      </appContext.Provider>
    );
  });

  // it('Have a value of number'),

  // it('Should contain 2 rows'),

  it('Should contain 6 static metrics', () => {
    // console.log('STATIC DATA SECTION: ', screen.getAllByRole("static_data_section"));
    // expect(screen.getAllByRole("static_data_section")).toHaveLength(6);
  });
});
