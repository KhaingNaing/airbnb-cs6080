import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import MasonryImageList from './ViewImages';
import StarIcon from '@mui/icons-material/Star';
import Paper from '@mui/material/Paper';
import ReviewList from './ReadRating';
import BookDialog from './BookDialog';

const RatingBox = ({ averageRating, totalReviews, reviews }) => {
  return (
    <div style={{ alignSelf: 'center', width: '40%' }} >
<Paper
      elevation={1}
      sx={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '8px',
        border: '2px solid #e0e0e0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <StarIcon style={{ color: 'orange' }}/>
      <Typography variant="h5" gutterBottom >
      {averageRating.toFixed(1)}
      </Typography>
      </div>
      <Typography variant="body2" color="textSecondary">
        Average Rating
      </Typography>
      <Typography variant="body2" color="textSecondary">
        ({totalReviews} reviews)
      </Typography>
      {/* List of reviews */}
      <ul style={{ margin: 0, padding: 0 }}>
        {reviews.map((review, index) => (
              <ListItem key={index}>
                <ReviewList rating={review.rating} viewOption='label'/>
                <Typography
                  label="Title"
                  sx={{ m: 0 }}
                >{review.comment}</Typography>
              </ListItem>
        ))}
      </ul>
    </Paper>
    </div>
  );
};

export default function ViewItem ({ token, setToken, id, props, navi }) {
  const [reviews, setReviews] = React.useState([]);
  const [avg, setAvg] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [ctoken, setcToken] = React.useState(null);
  React.useEffect(() => {
    const checktoken = localStorage.getItem('token');
    if (checktoken) {
      setcToken(checktoken);
    }
  }, [])
  React.useEffect(() => {
    if (props.reviews) {
      setReviews(props.reviews);
      setAvg(props.reviews.reduce((acc, review) => acc + (review.rating), 0) / props.reviews.length);
      setTotal(props.reviews.length);
    }
  }, [props])
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ alignSelf: 'center', width: '60%' }}>
      <Typography sx={{ textAlign: 'left' }} variant="h5" component="h5" gutterBottom>
        {props.title} - {props.address.city}
      </Typography>
      </div>
      <MasonryImageList Images={props.metadata.imageList} />
      <div style={{ alignSelf: 'center', width: '60%' }}>
      <Typography sx={{ textAlign: 'left', margin: 0 }} variant="h6" component="h6" gutterBottom>
        Stay in - {Object.values(props.address).join(', ')}
      </Typography>
      <Typography sx={{ textAlign: 'left' }} gutterBottom>
        {props.metadata.bedNum} beds . {props.metadata.bathNum} baths
      </Typography>
      <Typography
        label="Amenities"
        sx={{ m: 1, width: '25ch' }}
      >Amenities:{props.metadata.amen}</Typography>
        <Typography
          label="Price"
          sx={{ m: 1, width: '25ch' }}
        >Price:{props.price}</Typography>
        <Typography
          label="Type"
          sx={{ m: 1, width: '25ch' }}
        >Type:{props.metadata.type}</Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', width: '60%', flexWrap: 'wrap' }}>
        <RatingBox averageRating={avg} totalReviews={total} reviews={reviews} />
        <div style={{ textAlign: 'center', width: '60%' }} >
          {props.availability.map((ava, index) => (
            <Typography key={index}>
              Availability {index} : {ava.start} -- {ava.end} </Typography>
          ))}
          {ctoken && <BookDialog token={token} setToken={setToken} id={id} price={props.price} />}
        </div>
      </div>
    </Box>
  );
}
