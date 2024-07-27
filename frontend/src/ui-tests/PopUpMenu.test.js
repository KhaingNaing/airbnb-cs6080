// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';
// import { MemoryRouter, BrowserRouter } from 'react-router-dom';
// import { Login } from '../pages/Login';

// describe('Demonstrating some useNavigate() tests ', () => {
//   it('Renders the Login component', () => {
//     const { getByText } = render(
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     );

//     const button = getByText(/login/i);
//     expect(button).toBeInTheDocument();
//     userEvent.click(button);
//   });
// });
// import { Login } from '../pages/Login';
// import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';

// describe('LoginButton', () => {
//   it('renders and delete the listing on click', () => {
//     // render the component
//     const history = createMemoryHistory({ initialEntries: ['/login'] });
//     render(
//       <Router history={history}>
//         <ButtonLogin />
//       </Router>
//     )

//     // Login submit button
//     const loginBtn = screen.getByTest(/login/i);
//     expect(loginBtn).toBeInTheDocument();

//     // submit login info
//     // userEvent.click(loginBtn);

//     screen.debug();
//   })
// })
