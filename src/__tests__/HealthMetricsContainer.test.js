import React from 'react';
import { render, screen } from '@testing-library/react';
import HealthMetricsContainer from '../Containers/HealthMetricsContainer';
import { appContext } from '../App';
import { providerProps } from '../__mocks__/DefaultContext';

describe('Static Health Metrics Tests', () => {
  beforeEach(() => {
    render (
      <appContext.Provider value={providerProps}>
        <HealthMetricsContainer/>
      </appContext.Provider>
    );
  });

  it('Have a value of number'),

  it('Should contain 2 rows'),

  it('Should contain 3 cells per row'),
});
