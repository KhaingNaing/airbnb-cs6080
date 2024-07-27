import React from 'react';
// import AccountMenu from './Menu';
import MenuBar from './MenuBar';
function HeaderBar ({ token, setToken }) {
  return (
    <>
      <MenuBar token={token} setToken={setToken}></MenuBar>
    </>
  );
}

export default HeaderBar;
