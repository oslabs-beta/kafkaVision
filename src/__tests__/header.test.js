import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Components/Header';
import { appContext } from '../App';
import { providerProps } from '../__mocks__/DefaultContext';
import { jest } from '@jest/globals';
import { mockChartJs } from '../../__mocks__/chart';
import { BroswerRouter, BrowserRouter } from'react-router-dom';


describe('Header component', () => {
  beforeEach(() => {
    render(
      <appContext.Provider value={providerProps}>
        <BrowserRouter><Header /></BrowserRouter>
      </appContext.Provider>
    );
  });

  it('renders 2 buttons to page', () => {
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('renders a banner to the page', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('Should have text kafkaVision', () => {
    expect(screen.getByText('kafkaVision', {exact:true}));
  });
});
