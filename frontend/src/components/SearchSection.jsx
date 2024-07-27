import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const valuetext = (value) => {
  return `${value}`;
}

const BedRangeSlider = (bedNum, setBedNum) => {
  const handleChangeBeds = (e, newValue) => {
    setBedNum(newValue);
  }
  return (
    <React.Fragment>
      <Box>
      <Typography gutterBottom>BedNumber</Typography>
      <Slider
        getAriaLabel={() => 'Bedrooms range'}
        value={bedNum}
        onChange={handleChangeBeds}
        getAriaValueText={valuetext}
        valueLabelDisplay="on"
        step={1}
        marks
        min={0}
        max={10}
        disableSwap
        />
      </Box>
    </React.Fragment>
  )
}

const PriceRangeSlider = (price, setPrice) => {
  const handleChangePrice = (e, newValue) => {
    setPrice(newValue);
  }
  return (
    <Box>
      <Typography gutterBottom>Price Range</Typography>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={price}
        onChange={handleChangePrice}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        min={0}
        max={2000}
        disableSwap
      />
    </Box>
  )
}

const DateRangeInput = (setStartDate, setEndDate) => {
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Please provide a vaild date range for search</Typography>
      <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Start Date" onChange={(newValue) => setStartDate(dayjs(newValue).format('DD/MM/YYYY'))}/>
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="End Date" onChange={(newValue) => setEndDate(dayjs(newValue).format('DD/MM/YYYY'))}/>
          </DemoContainer>
        </LocalizationProvider>
      </Stack>
    </Box>
  );
}

const reviewFilter = (rate, setRate, reviewBound, setReviewBound) => {
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Please provide a rating for search</Typography>
      <Rating
        name="simple-controlled"
        value={rate}
        onChange={(event, newValue) => {
          setRate(newValue);
        }}
      />
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={reviewBound}
          name="radio-buttons-group"
          onChange={e => setReviewBound(e.target.value)}
        >
          <FormControlLabel value="up" control={<Radio />} label="& Up" />
          <FormControlLabel value="down" control={<Radio />} label="& Down" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

const searchBy = (
  option,
  title, setTitle,
  price, setPrice,
  bedNum, setBedNum,
  setStartDate, setEndDate,
  review, setReview,
  reviewBound, setReviewBound) => {
  switch (option) {
    case 'title':
      return (
        <Box
          sx={{
            '& > legend': { mt: 2 },
          }}
        >
          <Typography component="legend">Please provide a title for search</Typography>
          <TextField
          label="PropertyTitle Location"
          sx={{ m: 1, width: '25ch' }}
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          />
        </Box>
      );
    case 'bed': {
      return BedRangeSlider(bedNum, setBedNum);
    }
    case 'price': {
      return PriceRangeSlider(price, setPrice);
    }
    case 'review': {
      return reviewFilter(review, setReview, reviewBound, setReviewBound);
    }
    case 'date': {
      return DateRangeInput(setStartDate, setEndDate);
    }
    default: {
      return null;
    }
  }
}

const BasicSelect = ({ setFunction }) => {
  const [searchOption, setSearchOption] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState([200, 1000]);
  const [bedNum, setBedNum] = React.useState([0, 2]);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [filterDict, setFilterDict] = React.useState({});
  const [disableSearch, setDisableSearch] = React.useState(true);
  const [review, setReview] = React.useState(0);
  const [reviewBound, setReviewBound] = React.useState('up');

  const handleChange = (event) => {
    setSearchOption(event.target.value);
    setDisableSearch(true);
  };

  React.useEffect(() => {
    const updateFilterDict = () => {
      switch (searchOption) {
        case 'title':{
          if (!title) {
            setDisableSearch(true);
          } else {
            setDisableSearch(false);
            setFilterDict({ Title: title });
          }
          break;
        }
        case 'bed': {
          setDisableSearch(false);
          setFilterDict({ Beds: bedNum });
          break;
        }
        case 'price': {
          setDisableSearch(false);
          setFilterDict({ Price: price });
          break;
        }
        case 'review': {
          setDisableSearch(false);
          setFilterDict({
            rating: review === null ? 0 : review,
            ratingBound: reviewBound,
          });
          break;
        }
        case 'date':{
          if (!startDate || startDate !== 'Invalid Date' || !endDate || endDate !== 'Invalid Date') {
            setDisableSearch(true);
          }
          if ((startDate && startDate !== 'Invalid Date') && (endDate && endDate !== 'Invalid Date')) {
            setDisableSearch(false);
            setFilterDict({ start: startDate, end: endDate });
          }
          break;
        }
        default:
          return null;
      }
    };
    updateFilterDict();
  }, [searchOption, title, price, bedNum, startDate, endDate, review, reviewBound]);

  const handleClick = () => {
    if (filterDict) {
      setFunction({ ...filterDict });
    } else {
      console.error('filterDict is undefined or null');
    }
  };

  const handleClear = () => {
    setFunction({});
  }

  return (
    <Stack spacing={1} sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Search Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchOption}
          label="Search Filter"
          onChange={handleChange}
        >
          <MenuItem value={'title'}>PropertyTitle & Location</MenuItem>
          <MenuItem value={'bed'}>Number of Beds</MenuItem>
          <MenuItem value={'price'}>Price Range</MenuItem>
          <MenuItem value={'review'}>Review</MenuItem>
          <MenuItem value={'date'}>Available Date Range</MenuItem>
        </Select>
      </FormControl>
      {((searchOption === 'title') || (searchOption === 'date')) && <Typography variant="body2" gutterBottom>
      </Typography>}
      {searchBy(searchOption, title, setTitle, price, setPrice, bedNum, setBedNum, setStartDate, setEndDate, review, setReview, reviewBound, setReviewBound)}
      <Stack direction='row' spacing={2}>
        <Button variant="contained" onClick={handleClick} sx={{ width: 100 }} disabled={disableSearch}>Search</Button>
        <Button variant="contained" sx={{ width: 'fit-content' }} endIcon={<RestartAltIcon />} onClick={handleClear}>
          Clear Filter
        </Button>
      </Stack>
    </Stack>
  );
}

export default BasicSelect;
