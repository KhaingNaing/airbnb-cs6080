import { TextField } from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const url = 'http://localhost:5005/user/auth/register';

function Register (props) {
  console.log(props)
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [name, setName] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (props.token) {
      navigate('/');
    }
  }, [props.token]);

  const register = async () => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email, password, name
      }),
      headers: {
        'Content-type': 'application/json',
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else if (data.token) {
      alert('Registeration Success');
      localStorage.setItem('token', data.token);
      localStorage.setItem('NowUser', email);
      props.setToken(data.token);
    }
  };
  const handleRegister = () => {
    if (password !== passwordConfirm) {
      alert('Passwords need to match');
    } else {
      register();
    }
  }
  return (
    <>
    <Typography variant='h4' gutterBottom>Register</Typography>
    <TextField label='Email'
    type='email'
    value={email}
    onChange={e => setEmail(e.target.value)}
    required
    ></TextField><br/>
    <TextField label='Password' type='password' value={password} onChange={e => setPassword(e.target.value) } required></TextField><br/>
    <TextField label='Confirm password' type='password' value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} required></TextField><br/>
    <TextField label='text' type='text' value={name} onChange={e => setName(e.target.value)} required></TextField><br/>

    <Button variant="contained" onClick={handleRegister}>Register</Button>
    </>
  );
}

export default Register;
