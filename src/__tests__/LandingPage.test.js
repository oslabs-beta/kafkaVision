import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import LandingPage from '../LandingPage';
import{ BrowserRouter } from'react-router-dom';
import { unmountComponentAtNode } from "react-dom";


describe('Does Landing page render', () => {
  beforeEach(() => {
    render(<BrowserRouter><LandingPage /></BrowserRouter>);
  });

  it('renders a link to the page', () => {
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });
});
