import React from 'react';
import { render, screen } from '@testing-library/react';
import BoardGameTracker from './BoardGameTracker';

describe('BoardGameTracker Component', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore(); 
  });

  test('renders the title', () => {
    render(<BoardGameTracker />); 

    const titleElement = screen.getByText(/Board Game Tracker/i); 
    expect(titleElement).toBeInTheDocument(); 
  });
});
