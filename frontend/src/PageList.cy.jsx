import React from 'react'
import PageList from './PageList'
import { BrowserRouter as Router } from 'react-router-dom';

describe('<PageList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    <Router>
    <PageList />
  </Router>
  })
})
