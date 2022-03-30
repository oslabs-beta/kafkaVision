import React from 'react';
import { render, screen, getByText } from '@testing-library/react';
import Sidebar from '../Components/Sidebar';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { appContext } from '../App';
import { providerProps } from '../__mocks__/DefaultContext';

xdescribe('Sidebar Tests', () => {
  beforeEach(() => {
    render(
      <appContext.Provider value={providerProps}>
        <BrowserRouter><Sidebar /></BrowserRouter>
      </appContext.Provider>
    );
  });

  it('Renders all links to page', () => {
    console.log('SIDEBAR LINKS:', screen.getAllByRole('link'))
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });

  it('Should have text Connect Cluster', () => {
    expect(screen.getByText('Connect Cluster', {exact:true}));
  });

  it('Should have text Health Metrics', () => {
    expect(screen.getByText('Health Metrics', {exact:true}));
  });

  it('Should have text Partition Diagrams', () => {
    expect(screen.getByText('Partition Diagrams', {exact:true}));
  });

  it('Should have text Topic Metrics', () => {
    expect(screen.getByText('Topic Metrics', {exact:true}));
  });


})
