import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ListDetail from '../components/ListDetail';
import Typography from '@mui/material/Typography';

const url = 'http://localhost:5005/listings/';

function EditList (props) {
  const { id } = useParams();
  const [listCard, setListCard] = React.useState('');
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!props.token) {
      navigate('/login');
    }
  }, [props.token]);

  async function fetchLists () {
    const response = await fetch(url + id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setListCard(<ListDetail token={props.token} route={id} func={'PUT'} props={data.listing}/>);
    }
  }

  React.useEffect(() => {
    fetchLists();
  }, [id]);

  return (
    <>
      <Typography variant='h4' gutterBottom>Edit Listing</Typography>
      {listCard}
    </>
  );
}

export default EditList;
