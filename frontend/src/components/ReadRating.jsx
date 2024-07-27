import * as React from 'react';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Tooltip from '@mui/material/Tooltip';
import { Box, Divider } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

const findCount = (reviews, target) => {
  const filteredList = reviews.filter(item => item.rating === target);
  return filteredList.length
}

const ratingBreakDown = (reviews) => {
  const [labelCount, setLabelCount] = React.useState([
    { value: 1, count: 0 },
    { value: 2, count: 0 },
    { value: 3, count: 0 },
    { value: 4, count: 0 },
    { value: 5, count: 0 },
  ])
  React.useEffect(() => {
    updateLabelCount(1, oneStars);
    updateLabelCount(2, twoStars);
    updateLabelCount(3, threeStars);
    updateLabelCount(4, fourStars);
    updateLabelCount(5, fiveStars);
  }, [reviews])
  const updateLabelCount = (value, newCount) => {
    setLabelCount((prev) => {
      return prev.map((label) =>
        label.value === value ? { ...label, count: newCount } : label
      );
    })
  }
  const oneStars = findCount(reviews, 1);
  const twoStars = findCount(reviews, 2);
  const threeStars = findCount(reviews, 3);
  const fourStars = findCount(reviews, 4);
  const fiveStars = findCount(reviews, 5);
  const total = oneStars + twoStars + threeStars + fourStars + fiveStars;
  return (
    <Tooltip
      title={
        <Stack spacing={1} style={{ minWidth: '200px', backgroundColor: 'white', padding: '20px', color: 'black' }}>
          <span style={{ fontSize: '1rem' }}>{total} ratings</span>
          <Divider />
          {labelCount.map((item, index) => (
            <Box key={index} marginBottom={1}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span>{item.value} Star</span>
                <span>{((item.count / total) * 100).toFixed(0)}%</span>
              </div>
              <LinearProgress variant="determinate" value={(item.count / total) * 100} sx={{ height: '15px' }} color="secondary" />
            </Box>
          ))}
        </Stack>
      }
      arrow
    >
      <StarIcon style={{ color: 'orange', fontSize: '1.2rem' }}/>
    </Tooltip>
  );
}
export default function ReviewList ({ rating, viewOption, reviews }) {
  const result = (viewOption) => {
    if (viewOption === 'label') {
      return (
        <Stack spacing={1}>
          <Rating value={rating} precision={0.1} size="small" readOnly />
        </Stack>
      );
    } else {
      return (
        <Stack spacing={0.5} direction='row' alignItems='center'>
          {rating > 0
            ? ratingBreakDown(reviews)
            : (<Tooltip title='No rating yet'>
              <StarOutlineIcon style={{ fontSize: '1.2rem' }}/>
              </Tooltip>)}
          <span style={{ fontSize: '1rem' }}>{rating}</span>
        </Stack>
      );
    }
  }
  return result(viewOption);
}
