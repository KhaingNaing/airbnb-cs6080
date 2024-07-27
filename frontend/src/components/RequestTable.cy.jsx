import React from 'react'
import RequestTable from './RequestTable'

describe('<RequestTable />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    const testProps = {
      id: 693007437, // can replace with local listing id
      token: null // can replace with local token
    }
    cy.mount(<RequestTable {...testProps}/>)
  })
})