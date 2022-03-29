import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Components/Header';
import { appContext } from '../App';
import { providerProps } from '../__mocks__/DefaultContext';
import { jest } from '@jest/globals';
import { mockChartJs } from '../../__mocks__/chart';

// jest.mock('chart.js', () => ({
//   __esModule: true,
//   default: () => null,
//   Chart: () => null,
//   BarElement: () => null,
//   BarController: () => null,
//   CategoryScale: () => null,
//   LinearScale: () => null,
//   PointElement: () => null,
//   LineElement: () => null,
//   Title: () => null,
//   Tooltip: () => null,
//   Legend: () => null
// }));

// jest.mock('react-chartjs-2', () => ({
//   __esModule: true,
//   Bar: () => null,
//   Line: ()=> null
// }));

describe('Header component', () => {
  beforeEach(() => {
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