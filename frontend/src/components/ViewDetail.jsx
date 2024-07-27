import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack/Stack';
import ReviewList from './ReadRating';
import BookDialog from './BookDialog';
import StandardImageList from './Images';

function ViewDetail ({ token, setToken, id, props, navi }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <Typography
          label="Title"
          sx={{ m: 1, width: '25ch' }}
        >Title:{props.title}</Typography>
        <Typography
          label="Address"
          sx={{ m: 1, width: '25ch' }}
        >Address:{Object.values(props.address).join(', ')}</Typography>
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
        <Typography
          label="Number of bedrooms"
          sx={{ m: 1, width: '25ch' }}
        >Number of bedrooms:{props.metadata.bedNum}</Typography>
        <Typography
          label="Number of bathrooms"
          sx={{ m: 1, width: '25ch' }}
        >Number of bathrooms:{props.metadata.bathNum}</Typography>
        {props.metadata.imageList.length !== 0 && <StandardImageList imageList={props.metadata.imageList}/>}
         <div>
          <List>
            {props.reviews.map((review, index) => (
              <ListItem key={index}>
                <ReviewList rating={review.rating} viewOption='label'/>
                <Typography
                  label="Title"
                  sx={{ m: 1, width: '25ch' }}
                >{review.comment}</Typography>
              </ListItem>
            ))}
          </List>
        </div>
        <Stack direction="row" spacing={2}>
          {props.availability.map((ava, index) => (
            <Typography key={index}>
              Availability {index} : {ava.start} -- {ava.end} </Typography>
          ))}
          {token && <BookDialog token={token} setToken={setToken} id={id} price={props.price} />}
        </Stack>
      </div>
    </Box>
  );
}
export default ViewDetail;
