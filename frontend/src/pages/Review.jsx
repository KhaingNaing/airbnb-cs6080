import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { Button } from '@mui/material';

const labels = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};
function Review ({ token, setToken }) {
  const navigate = useNavigate();
  const { listId, bookId } = useParams();
  const [rate, setRate] = useState(5);
  const [com, setCom] = useState('');
  const [review, setReview] = useState({});

  React.useEffect(() => {
    setReview({
      rating: rate,
      comment: com
    });
  }, [rate, com])

  const postReview = async () => {
    const response = await fetch('http://localhost:5005/listings/' + listId + '/review/' + bookId, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        review
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      // use filter and map create a new array ids
      alert('Review Success');
      navigate(-1);
    }
  };

  return (
    <>
    <Stack spacing={1}>
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={rate}
        precision={1}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        onChange={(event, newValue) => {
          setRate(newValue);
        }}
      />
      <Box sx={{ ml: 2 }}>{labels[rate]}</Box>
    </Box>

      <TextField
        label="Comment"
        sx={{ m: 1, width: '25ch' }}
        type="text"
        value={com}
        onChange={e => setCom(e.target.value)}
      />
    </Stack>
    <Button size="small" variant="contained" color="primary" onClick={() => postReview()}>Post</Button>
    </>
  );
}

export default Review;
