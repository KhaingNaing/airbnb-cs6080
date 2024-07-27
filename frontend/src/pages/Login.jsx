import React from 'react';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const url = 'http://localhost:5005/user/auth/login';

function Login (props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (props.token) {
      navigate('/');
    }
  }, [props.token]);

  const login = async () => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email, password
      }),
      headers: {
        'Content-type': 'application/json',
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('NowUser', email);
      props.setToken(data.token);
    }
  }
  return (
    <>
      <Typography variant='h4' gutterBottom>Login</Typography>
      <TextField label='Email'
      type='email'
      value={email}
      onChange={e => setEmail(e.target.value)}
      ></TextField><br/>
      <TextField label='Password' type='password' value={password} onChange={e => setPassword(e.target.value)}></TextField><br/>

      <Button variant="contained" onClick={login}>Login</Button>
    </>
  );
}

export default Login;
