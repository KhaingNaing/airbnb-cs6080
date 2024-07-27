import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import { Stack } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import StatusTable from './StatusTable';
// import { set } from 'date-fns';

const urlNew = 'http://localhost:5005/bookings/new/';

const urlBook = 'http://localhost:5005/bookings';
const user = localStorage.getItem('NowUser');

function BookDialog ({ token, setToken, id, price }) {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState({});
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [days, setDays] = React.useState(0);
  const [bookList, setBookList] = React.useState([]);

  React.useEffect(() => {
    // const checktoken = localStorage.getItem('token');
    // if (checktoken) {
    //   setToken(checktoken);
    // }
    if (token) {
      getBooking();
    }
  }, [token])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (startDate && endDate && startDate.isValid() && endDate.isValid()) {
      setDays(endDate.diff(startDate, 'day'));
      setDateRange({
        start: startDate.format('DD/MM/YYYY'),
        end: endDate.format('DD/MM/YYYY'),
        dayNum: endDate.diff(startDate, 'day')
      });
    }
  }, [startDate, endDate]);

  React.useEffect(() => {
    if (days > 0) {
      setTotalPrice(days * price);
    }
  }, [days]);

  const handleBook = async () => {
    if ((dateRange.start && dateRange.start !== 'Invalid Date') && (dateRange.end && dateRange.end !== 'Invalid Date') &&
     dateRange.dayNum > 0) {
      // setTotalPrice(price * (dateRange.endDate - dateRange.startDate));
      const response = await fetch(urlNew + id, {
        method: 'POST',
        body: JSON.stringify({
          dateRange, totalPrice
        }),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert('success');
        // console.log(data);
        getBooking();
        handleClose();
      }
    } else {
      alert('Please provide one availability date range for Booking.');
    }
    // (dateRange.start === null || dateRange.end === null)
  };

  const getBooking = async () => {
    const response = await fetch(urlBook, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      // use filter and map create a new array ids
      console.log(data);
      const ids = data.bookings.filter(list => (list.listingId === id && list.owner === user));
      setBookList(ids);
    }
  };

  return (
    <>
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Make a booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide the date range that you would like to book.
          </DialogContentText>
          </DialogContent>
          <DialogContent>
          <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Start Date" onChange={(newValue) => setStartDate(dayjs(newValue))}/>
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="End Date" onChange={(newValue) => setEndDate(dayjs(newValue))}/>
              </DemoContainer>
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBook}>Book</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    <Stack>
    <StatusTable bookList={bookList} setBookList={setBookList} token={token} id={id}/>
      <Button variant="outlined" onClick={handleClickOpen}>
          BOOK
      </Button>
    </Stack>
    </>
  );
}
export default BookDialog;
