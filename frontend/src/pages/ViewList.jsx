import * as React from 'react';
import { useParams } from 'react-router-dom';
import ViewItem from '../components/ViewItem';

const url = 'http://localhost:5005/listings/';

function ViewList (props) {
  const { id } = useParams();
  const [listCard, setListCard] = React.useState('');

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
      setListCard(<ViewItem token={props.token} setToken={props.setToken} id={id} props={data.listing}/>);
    }
  }

  React.useEffect(() => {
    console.log('render')
    fetchLists();
  }, []);

  return (
    <>
      {listCard}
    </>
  );
}

export default ViewList;
