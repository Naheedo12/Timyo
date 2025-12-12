import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Logout from '../Logout';

// Mock du service d'authentification
jest.mock('../../api/authService', () => ({
  logout: jest.fn(() => Promise.resolve())
}));

describe('Logout Component', () => {
  test('renders logout button', () => {
    const mockSetUser = jest.fn();
    
    render(<Logout setUser={mockSetUser} />);
    
    const logoutButton = screen.getByText('Se déconnecter');
    expect(logoutButton).toBeInTheDocument();
  });

  test('calls setUser when logout button is clicked', async () => {
    const mockSetUser = jest.fn();
    
    render(<Logout setUser={mockSetUser} />);
    
    const logoutButton = screen.getByText('Se déconnecter');
    fireEvent.click(logoutButton);
    
    // Attendre que l'appel async soit terminé
    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith(null);
    });
  });
});