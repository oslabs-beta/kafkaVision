import React from 'react';
//import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
//import App from '../App.tsx';
import LoginPage from '../LoginPage';

describe('Sidebar component', () => {
  beforeEach(() => render(<LoginPage />));

  it('renders 2 buttons to page', () => {
    expect(screen.getByRole('button')).toHaveLength(2);
  });

  it('renders a banner to the page', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
