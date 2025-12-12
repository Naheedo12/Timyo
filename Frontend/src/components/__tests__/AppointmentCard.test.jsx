import React from 'react';
import { render, screen } from '@testing-library/react';
import AppointmentCard from '../AppointmentCard';

// Mock du service de rendez-vous
jest.mock('../../api/appointmentService', () => ({
  cancelAppointment: jest.fn(() => Promise.resolve())
}));

describe('AppointmentCard Component', () => {
  const mockAppointment = {
    id: 1,
    date: '2024-12-15',
    time: '14:30',
    status: 'pending'
  };

  test('renders appointment information correctly', () => {
    const mockOnCancel = jest.fn();
    
    render(
      <AppointmentCard 
        appointment={mockAppointment} 
        onAppointmentCanceled={mockOnCancel} 
      />
    );
    
    // Vérifier que la date est affichée
    expect(screen.getByText('15/12/2024')).toBeInTheDocument();
    
    // Vérifier que l'heure est affichée
    expect(screen.getByText('14:30')).toBeInTheDocument();
    
    // Vérifier que le statut est affiché
    expect(screen.getByText('En attente')).toBeInTheDocument();
  });

  test('renders cancel button', () => {
    const mockOnCancel = jest.fn();
    
    render(
      <AppointmentCard 
        appointment={mockAppointment} 
        onAppointmentCanceled={mockOnCancel} 
      />
    );
    
    const cancelButton = screen.getByText('Annuler');
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveClass('bg-red-400');
  });
});