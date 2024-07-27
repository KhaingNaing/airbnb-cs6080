import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Footer from './components/Footer';
import HostedListing from './pages/HostedListing';
import CreateList from './pages/CreateList';
import EditList from './pages/EditListing';
import HeaderBar from './components/Header';
import LandingPage from './pages/LandingPage'
import ViewList from './pages/ViewList';
import DealRequest from './pages/DealRequest';
import Review from './pages/Review';

function PageList () {
  const [token, setToken] = React.useState(null);
  // const navigate = useNavigate();

  React.useEffect(() => {
    const checktoken = localStorage.getItem('token');
    if (checktoken) {
      setToken(checktoken);
    }
  }, [])

  return (
  <>
    <HeaderBar token={token} setToken={setToken}/><br/>
      <Routes>
        <Route path="/" element={<LandingPage token={token} setToken={setToken}/>}></Route>
        <Route path="/register" element={<Register token={token} setToken={setToken}/>}></Route>
        <Route path="/login" element={<Login token={token} setToken={setToken}/>}></Route>
        <Route path="/hostedlisting" element={<HostedListing token={token} setToken={setToken}/>} />
        <Route path="/editlisting/:id" element={<EditList token={token} setToken={setToken}/>} />
        <Route path="/viewlisting/:id" element={<ViewList token={token} setToken={setToken}/>} />
        <Route path="/request/:id" element={<DealRequest token={token} setToken={setToken}/>} />
        <Route path="/review/:listId/:bookId" element={<Review token={token} setToken={setToken}/>} />
        <Route path="/createlist" element={<CreateList token={token} setToken={setToken}/>} />
      </Routes><br/>
  <Footer />
  </>
  );
}

export default PageList;
