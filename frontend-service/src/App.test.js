// BoardGameTracker.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import BoardGameTracker from './BoardGameTracker';

describe('BoardGameTracker Component', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore(); // Restore original console.error after tests
  });

  test('renders the title', () => {
    render(<BoardGameTracker />); // Render the component

    // Check if the title is in the document
    const titleElement = screen.getByText(/Board Game Tracker/i); // Using regex to match case-insensitively
    expect(titleElement).toBeInTheDocument(); // Assert that the title is present
  });
});
