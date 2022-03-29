import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import LandingPage from '../LandingPage';

describe('Header component', () => {
  beforeEach(() => {
    render(<LandingPage />);
  });

  it('renders 2 buttons to page', () => {
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('renders a banner to the page', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
