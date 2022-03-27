import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Components/Header';
import { StateProvider } from '../__mocks__/MockStateProvider';

describe('Sidebar component', () => {
  beforeEach(() =>
    render(
      <StateProvider>
        <Header />
      </StateProvider>
    )
  );

  it('renders 2 buttons to page', () => {
    expect(screen.getByRole('button')).toHaveLength(2);
  });

  it('renders a banner to the page', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
