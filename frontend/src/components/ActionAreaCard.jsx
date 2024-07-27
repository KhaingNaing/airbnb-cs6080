import * as React from 'react';
import ListCard from './Card';
import Grid from '@mui/material/Grid';

const url = 'http://localhost:5005/listings/';

const subStringSearch = (searchString, mainString) => {
  const searchWord = searchString.toLowerCase().split(' ');
  const foundWord = searchWord.some(w => mainString.toLowerCase().includes(w));
  if (foundWord) {
    return true;
  } else {
    return false;
  }
}

const RangeSearch = (min, max, target) => {
  return (target >= min) && (target <= max);
}

const availabilitySearch = (startDate, endDate, targetList) => {
  const found = targetList.some(item => startDate >= item.start && endDate <= item.end);
  if (found) {
    return true;
  } else {
    return false;
  }
}

const avgRating = (listing) => {
  let average = 0;
  if (listing.reviews.length > 0) {
    average = listing.reviews.reduce((accumulate, item) => (accumulate + item.rating), 0) / listing.reviews.length;
  }
  return { ...listing, avgRating: isNaN(average) ? 0 : parseFloat(average.toFixed(1)) };
}

const executeSearch = (filterStr, res, filterVal) => {
  switch (filterStr) {
    case 'title' : {
      return res.filter(item => (subStringSearch(filterVal[0], item.title) || subStringSearch(filterVal[0], Object.values(item.address).join(', '))));
    }
    case 'metadata bedNum': {
      const bedRange = filterVal[0];
      return res.filter(item => RangeSearch(bedRange[0], bedRange[1], item.metadata.bedNum));
    }
    case 'price': {
      const priceRange = filterVal[0];
      return res.filter(item => RangeSearch(priceRange[0], priceRange[1], item.price));
    }
    case 'availability': {
      const [startDate, endDate] = filterVal;
      return res.filter(item => availabilitySearch(startDate, endDate, item.availability));
    }
    case 'review': {
      const [rating, upOrDown] = filterVal;
      const updatedList = res.map(item => avgRating(item));
      const filterList = (upOrDown === 'up')
        ? updatedList.filter(item => item.avgRating >= rating)
        : updatedList.filter(item => item.avgRating <= rating);
      const sortList = filterList.sort((a, b) => {
        if (a.avgRating > b.avgRating) { return -1; }
        if (a.avgRating < b.avgRating) { return 1; }
        return 0;
      })
      return sortList;
    }
    default: {
      return res;
    }
  }
}

function ActionAreaCard ({ lists, bookings, screen, filter, reload, setReload }) {
  const [listCards, setListCards] = React.useState([]);
  const [filterString, setFilterString] = React.useState('');
  const [filterValue, setFilterValue] = React.useState(null);
  const [bookingList, setBookingList] = React.useState([]);

  React.useEffect(() => {
    if (bookings) {
      setBookingList(bookings);
    }
  }, [bookings])

  React.useEffect(() => {
    const updateState = () => {
      let filterOpt = Object.keys(filter);
      setFilterValue(Object.values(filter));
      filterOpt = filterOpt.map(v => v.toLowerCase());
      switch (true) {
        case filterOpt.includes('title'):
          setFilterString('title');
          break;
        case filterOpt.includes('beds'):
          setFilterString('metadata bedNum');
          break;
        case filterOpt.includes('price'):
          setFilterString('price');
          break;
        case filterOpt.includes('start'):
          setFilterString('availability');
          break;
        case filterOpt.includes('rating'):
          setFilterString('review');
          break;
        default:
          setFilterString('');
      }
    };
    if (filter) {
      updateState();
    }
  }, [filter]);

  const fetchItem = async (item) => {
    let result = null;
    const response = await fetch(url + item, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      result = { id: item, ...data.listing };
    }
    return result;
  }
  React.useEffect(() => {
    const convertList = async () => {
      let filterRes = [];
      // Use Promise.all to wait for all promises to resolve
      const results = await Promise.all(lists.map(item => fetchItem(item)));
      // Only published listings on LandingPage
      filterRes = (screen === 'landingpage') ? results.filter(item => item.published === true) : results;
      if (filterValue) {
        filterRes = executeSearch(filterString, filterRes, filterValue);
      }
      // Now 'results' contains the resolved values from all promises
      const cards = filterRes.map((item) => (
        <ListCard key={item.id} props={item} id={item.id} screen={screen} bookings={bookingList} reload={reload} setReload={setReload} />
      ));
      setListCards(cards);
    }
    convertList();
  }, [lists, filterValue, bookingList]);

  return (
    <>
    <Grid container spacing={2}>
      {listCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            {card}
          </Grid>
      ))}
    </Grid>
    </>
  );
}
export default ActionAreaCard;
