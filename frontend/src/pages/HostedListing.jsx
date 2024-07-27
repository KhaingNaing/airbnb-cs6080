import React from 'react';
import ActionAreaCard from '../components/ActionAreaCard';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SimpleDialogForJson from '../components/jsonDialog'

const url = 'http://localhost:5005/listings';

function HostedListing (props) {
  const [lists, setLists] = React.useState([]);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);
  // set refreshList to true when user delete specific listing
  const [refreshList, setrefreshList] = React.useState(false);

  React.useEffect(() => {
    if (!props.token) {
      navigate('/login');
    }
  }, [props.token]);

  const getLists = async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      const nowUser = localStorage.getItem('NowUser');
      // use filter and map create a new array ids
      const ids = data.listings
        .filter(list => list.owner === nowUser)
        .map(list => list.id);
      setLists(ids);
    }
  };

  // make sure it only run once
  React.useEffect(() => {
    getLists();
    setrefreshList(false);
  }, [refreshList]);

  return (
    <>
    <div style={{ display: 'flex', gap: '10px', margin: '10px' }}>
    <Button variant='outlined' onClick={() => navigate('/createlist')} >Create New</Button>
    <Button variant='outlined' onClick={() => setOpenDialog(true)}>Create via JSON</Button>
    </div>
    <SimpleDialogForJson token={props.token} openDialog={openDialog} setOpenDialog={setOpenDialog} reload={refreshList} setReload={setrefreshList} />
    <ActionAreaCard lists={lists} screen={'hostedlisting'} reload={refreshList} setReload={setrefreshList}/>
    </>
  );
}

export default HostedListing;
