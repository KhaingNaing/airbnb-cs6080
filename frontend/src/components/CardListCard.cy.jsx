import React from 'react'
import ListCard from './Card'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

describe('<ListCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    const testProps = {
      // token: null,
      // setToken: null,
      //
      props: {
        title: 'Oceanside Villa',
        owner: '123@123.com',
        address: {
          street: '1 Kensington Street',
          city: 'Kensington',
          state: 'NSW',
          postcode: '2032',
          country: 'Australia'
        },
        price: 350,
        thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
        metadata: {
          imageList: [
            {
              id: 1,
              name: 'image1',
              base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
              thumbnail: true
            }
          ],
          type: 'Apartment',
          bathNum: 2,
          bedNum: 2,
          amen: 'Lovely two person studio suitable for friends'
        },
        reviews: [],
        availability: [],
        published: false,
        postedOn: null
      },
      id: 693007437,
      screen: 'hostedlisting',
      bookings: null,
    }
    cy.mount(
    <Router>
      <Routes>
      <Route element={<ListCard {...testProps}/>} />
      </Routes>
    </Router>
    )
  })
})
