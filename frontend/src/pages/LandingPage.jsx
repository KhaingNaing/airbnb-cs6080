import * as React from 'react';
import ActionAreaCard from '../components/ActionAreaCard';
import BasicSelect from '../components/SearchSection';
import { Stack } from '@mui/material';

const url = 'http://localhost:5005';
const statusOrder = ['accepted', 'pending', 'declined'];

const LandingPage = (props) => {
  const [listCards, setListCards] = React.useState([]);
  const [filter, setFilter] = React.useState({});
  const [bookingStatus, setBookingStatus] = React.useState([]);

  React.useEffect(() => {
    fetchListings();
  }, [props.token])

  const fetchListings = async () => {
    const response = await fetch(url + '/listings/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      const bookingIds = await fetchBookings();
      if (bookingIds) {
      // if (bookingsOrder.length !== 0) {
        data.listings.sort((a, b) => {
          const indexA = bookingIds.indexOf(a.id);
          const indexB = bookingIds.indexOf(b.id);
          // Check if both listings have bookings
          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB; // Sort by bookings order
          }
          // If one of the listings has bookings, prioritize it
          if (indexA !== -1) {
            return -1;
          }
          if (indexB !== -1) {
            return 1;
          }
          // If neither has bookings, sort alphabetically by title
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0; // Titles are equal
        });
      } else {
        data.listings.sort((a, b) => {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
        });
      }
      const ids = data.listings.map(list => list.id);
      setListCards(ids);
    }
  }

  const fetchBookings = async () => {
    let BookingIds = []
    if (props.token) {
      const response = await fetch(url + '/bookings/', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${props.token}`
        }
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        data.bookings.sort((a, b) => {
          if (statusOrder.indexOf(a.status) < statusOrder.indexOf(b.status)) { return -1; }
          if (statusOrder.indexOf(a.status) > statusOrder.indexOf(b.status)) { return 1; }
          return 0;
        });
        BookingIds = data.bookings.map(booking => parseInt(booking.listingId, 10));
        setBookingStatus(data.bookings);
      }
    }
    return BookingIds;
  }

  return (
    <Stack spacing={1} sx={{ minWidth: 120 }}>
      <h2>Landing Page</h2>
      <BasicSelect setFunction={setFilter} />
      <ActionAreaCard lists={listCards} bookings={bookingStatus} screen={'landingpage'} filter={filter} />
    </Stack>
  );
}

export default LandingPage;
