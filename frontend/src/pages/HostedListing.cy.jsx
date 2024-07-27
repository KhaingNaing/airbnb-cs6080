import React from 'react'
import HostedListing from './HostedListing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

describe('<HostedListing />', () => {
  it('renders', () => {
    cy.mount(
    <Router>
      <Routes>
      <Route path="/hostedlisting" element={<HostedListing/>} />
      </Routes>
    </Router>
    )
  })
})