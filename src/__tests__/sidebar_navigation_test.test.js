import React from 'react';
import { render, screen, getByText } from '@testing-library/react';
import Sidebar from '../Components/Sidebar';
import { appContext } from '../App';
import App from '../App'
import { providerProps } from '../__mocks__/DefaultContext';
import userEvent from '@testing-library/user-event';

xdescribe('Sidebar Nav Tests', () => {
    beforeEach(() => {
      render(
        <App />
      );
    });
  
    it('Clicking "Component" button takes you to Partitions page', () => {
      // grab sidebar button
      const sidebarButton = screen.getByRole('component_button')
      // apply click to sidebar element
      userEvent.click(sidebarButton)
      // check if there is a div with role on the new rendered page (will write in role in necessary div)
      expect(screen.getByRole('test_selected').toBeInDocument());
    })
});