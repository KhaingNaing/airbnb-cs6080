import * as React from 'react';
// import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const url = 'http://localhost:5005/bookings';

function RequestTable ({ id, token, postDate }) {
  const [bookList, setBookList] = React.useState([]);
  const [profit, setProfit] = React.useState(0);
  const [leaseDays, setLeaseDays] = React.useState(0);

  const getBooking = async () => {
    const response = await fetch(url, {
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
      const ids = data.bookings.filter(list => list.listingId === id);
      setBookList(ids);
      // get total profit
      const money = ids.filter(list => list.status === 'accepted')
        .reduce((sum, list) => sum + list.totalPrice, 0);
      setProfit(money);
      // get total lease out days
      const lease = ids.filter(list => list.status === 'accepted')
        .reduce((sum, list) => sum + list.dateRange.dayNum, 0);
      setLeaseDays(lease);

      // Check if ids is an array before setting bookList
      if (Array.isArray(ids)) {
        setBookList(ids);
      } else {
        setBookList([]);
      }
    }
  };

  React.useEffect(() => {
    getBooking();
  }, []);

  const handleBook = async (Bid, index) => {
    const func = ['decline', 'accept']
    const response = await fetch('http://localhost:5005/bookings/' + func[index] + '/' + Bid, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      alert(func[index] + ' success');
      getBooking();
    }
  }

  return (
    <>
    <Typography variant='h4' gutterBottom>Profit:{profit}</Typography>
    <Typography variant='h4' gutterBottom>Total Lease: {leaseDays} Days</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>dateRange</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">totalPrice&nbsp;(g)</TableCell>
            <TableCell align="right">status&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookList.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.dateRange.start}-{row.dateRange.end}
              </TableCell>
              <TableCell align="right">{row.owner}</TableCell>
              <TableCell align="right">{row.totalPrice}</TableCell>
              {/* { !accIds.includes(row.id) && !decIds.includes(row.id) && */}
              { row.status === 'pending' &&
              <TableCell align="right">
                <Button size="small" variant="contained" color="primary" onClick={() => handleBook(row.id, 1)}>Accept</Button>
                <Button size="small" variant="contained" color="primary" onClick={() => handleBook(row.id, 0)}>Decline</Button>
              </TableCell>}
              { row.status !== 'pending' &&
              <TableCell align="right">
                {row.status}
              </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default RequestTable;
