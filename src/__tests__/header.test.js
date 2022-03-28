import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Components/Header';
import { appContext } from '../App';
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
  const setGlobalState = jest.fn();
  const setConnectionState = jest.fn();
  const connectionState = true;
  const globalState = null;

  const providerProps = {
    state: { globalState, connectionState },
    actions: { setGlobalState, setConnectionState },
  };

  beforeEach(() => render(
    <appContext.Provider value={providerProps}>
      <Header />
    </appContext.Provider>
  ));

  it('renders 2 buttons to page', () => {
  expect(screen.getAllByRole('button')).toHaveLength(2);
 });

  it('renders a banner to the page', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
