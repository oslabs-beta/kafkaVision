import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Components/Header';
import { appContext } from '../App';
import { providerProps } from '../__mocks__/DefaultContext';
import { jest } from '@jest/globals';

jest.mock('chart.js', () => ({
  Chart: () => null,
  CategoryScale: () => null,
  BarElement: () => null,
  BarController: () => null,
  Title: () => null,
  Tooltip: () => null,
  Legend: () => null,
}));

describe('Header component', () => {
  beforeEach(() =>
    render(
      <appContext.Provider value={providerProps}>
        <Header />
      </appContext.Provider>
    )
  );

  it('renders 2 buttons to page', () => {
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('renders a banner to the page', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
