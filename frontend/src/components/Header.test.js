import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderBar from './Header';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';

test('test header', () => {
  render(
    <Router>
      <HeaderBar />
    </Router>
  );
  // screen.logTesting
  const button = screen.getByRole('button', {
    name: /account of current user/i
  })
  userEvent.click(button);
  // expect(screen.logTestingPlaygroundURL());
  const profile = screen.getByText(/profile/i)
  expect(profile).toBeInTheDocument();
  const account = screen.getByText(/account/i);
  expect(account).toBeInTheDocument();
  const listing = screen.getByText(/all listings/i);
  expect(listing).toBeInTheDocument();
  const hosted = screen.getByText(/hosted listings/i);
  expect(hosted).toBeInTheDocument();
  const logout = screen.getByText(/logout/i);
  expect(logout).toBeInTheDocument();
});
