import * as React from 'react';
import ListDetail from '../components/ListDetail';
import { useNavigate } from 'react-router-dom';

function CreateList (props) {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!props.token) {
      navigate('/login');
    }
  }, [props.token]);

  return (
    <>
      <ListDetail token={props.token} route={'new'} func={'POST'} props={null}/>
    </>
  )
}

export default CreateList;
