import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RequestTable from '../components/RequestTable';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';

const url = 'http://localhost:5005/listings/';

function DealRequest ({ token, setToken }) {
  const { id } = useParams();
  const [postDate, setPostDate] = React.useState(0);
  const navigate = useNavigate();
  const [postDays, setPostDays] = React.useState(0);
  React.useEffect(() => {
    const currentTime = dayjs(new Date());
    const postedOn = dayjs(postDate);
    if (currentTime && postedOn && currentTime.isValid() && postedOn.isValid()) {
      console.log(postDate)
      setPostDays(currentTime.diff(postedOn, 'day'));
    }
  }, [postDate]);

  React.useEffect(() => {
    const checktoken = localStorage.getItem('token');
    if (checktoken) {
      setToken(checktoken);
    } else {
      navigate('/login');
    }
  }, [])

  const getListing = async () => {
    const response = await fetch(url + id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      console.log(data.listing.postedOn)
      setPostDate(data.listing.postedOn);
    }
  };

  React.useEffect(() => {
    getListing();
  }, []);

  return (
    <>
      <Typography variant='h4' gutterBottom>Posted on {postDays} days before</Typography>
      <RequestTable id={id} token={token} />
    </>
  );
}

export default DealRequest;
