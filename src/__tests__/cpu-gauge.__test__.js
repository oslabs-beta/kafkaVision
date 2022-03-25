import React from 'react';
//import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
// import App from '../App.tsx';
import CPUGAUGE from '../chartComponents/graphs/CPUGauge';
import CPUGauge from '../chartComponents/graphs/CPUGauge';

describe('Sidebar component', () => {
  beforeEach(() => render(CPUGauge));

  it('renders 2 buttons to page', () => {
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('renders a banner to the page', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
