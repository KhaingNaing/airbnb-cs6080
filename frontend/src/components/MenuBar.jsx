import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

const settings = ['All Listings', 'My Listings', 'Logout'];

function MenuBar (props) {
  const [user, setUser] = React.useState('');
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('NowUser');
    props.setToken(null);
  }
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    const nowUser = localStorage.getItem('NowUser');
    if (nowUser) {
      setUser(nowUser);
    } else {
      setUser('login pls');
    }
  }, [auth])

  React.useEffect(() => {
    if (props.token !== null) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [props.token])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AIRBNB
          </Typography>
          <div>
            <Tooltip title="Account Menu">
              <span>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {user}
              </span>
            </Tooltip>
            <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            {auth && settings.map((setting) => {
              let page = null
              switch (setting) {
                case 'Logout': {
                  return (
                    <MenuItem key={setting} onClick={handleLogOut}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>)
                }
                case 'All Listings': {
                  page = '/';
                  return (
                      <MenuItem key={setting} component={Link} to={page}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>);
                }
                case 'My Listings': {
                  page = '/hostedlisting';
                  return (
                    <MenuItem key={setting} component={Link} to={page}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  );
                }
                default: {
                  return (
                    <MenuItem key={setting} onClick={handleClose}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  );
                }
              }
            })}
            {!auth && (
              <div>
                <MenuItem component={Link} to='/login'>Login</MenuItem>
                <MenuItem component={Link} to='/register'>Register</MenuItem>
              </div>
            )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MenuBar;
