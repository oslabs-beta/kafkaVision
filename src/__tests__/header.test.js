import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Components/Header';
import { appContext } from '../App';
import { providerProps } from '../__mocks__/DefaultContext';
import { jest } from '@jest/globals';
import { mockChartJs } from '../../__mocks__/chart.js';
import { mockReactChartJs2 } from '../../__mocks__/react-chartjs-2';

describe('Header component', () => {
  beforeEach(() => {
    jest.mock('react-chartjs-2', mockReactChartJs2);
    jest.mock('chart.js', mockChartJs);
    render(
      <appContext.Provider value={providerProps}>
        <Header />
      </appContext.Provider>
    );
  });

  it('renders 2 buttons to page', () => {
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('renders a banner to the page', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
