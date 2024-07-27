import React from 'react'
import ViewDetail from './ViewDetail'

describe('<ViewDetail />', () => {
  it('renders', () => {
    const testProps = {
      token: null,
      setToken: null,
      id: 693007437,
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
      }
      // any other props needed
    };
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ViewDetail {...testProps}/>)
  })
})
