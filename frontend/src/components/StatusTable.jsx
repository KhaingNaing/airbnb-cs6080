import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
const user = localStorage.getItem('NowUser');

function StatusTable ({ bookList, setBookList, token, id }) {
  const navigate = useNavigate();
  async function deleteBook (bid) {
    const response = await fetch('http://localhost:5005/bookings/' + bid, {
      method: 'DELETE',
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
      alert('Delete Success')
      getBooking();
    }
  }

  const getBooking = async () => {
    const response = await fetch('http://localhost:5005/bookings', {
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 325 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>DateRange</TableCell>
            <TableCell align="right">Days</TableCell>
            <TableCell align="right">TotalPrice</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Handle</TableCell>
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
              <TableCell align="right">{row.dateRange.dayNum}</TableCell>
              <TableCell align="right">{row.totalPrice}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
                {row.status === 'accepted' && <Button size="small" variant="contained" color="primary" onClick={() => navigate(`/review/${id}/${row.id}`)}>Review</Button>}
                {row.status !== 'accepted' && <Button size="small" variant="contained" color="primary" onClick={() => deleteBook(row.id)}>Delete</Button>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default StatusTable;
