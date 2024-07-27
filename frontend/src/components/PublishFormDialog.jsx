import * as React from 'react';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
// import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const url = 'http://localhost:5005/listings/publish/';

const PublishFormDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [availability, setAvailability] = React.useState([]);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    if (props.openDialog) {
      handleClickOpen();
      props.setOpenDialog(false);
    }
  }, [props.openDialog]);

  const handlePublish = async () => {
    if (availability.length === 0) {
      alert('Please provide at least one availability date range for the listing to go live.');
    } else {
      const response = await fetch(url + props.listingID, {
        method: 'PUT',
        body: JSON.stringify({
          availability
        }),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${props.token}`
        }
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert('success');
        props.setDisable(true);
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    if (startDate && endDate && startDate.isValid() && endDate.isValid()) {
      if (endDate.diff(startDate, 'day') <= 0) {
        alert('End date cannot be less than start date');
      } else {
        const dateDict = {
          start: startDate.format('DD/MM/YYYY'),
          end: endDate.format('DD/MM/YYYY')
        }
        setAvailability(oldArray => [...oldArray, dateDict]);
        alert('Availability successfully added');
      }
    } else {
      alert('Please provide complete date range for the availability to be added.');
    }
  }

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Go Live!</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Please provide at least one date range for your listing to go live!
          </DialogContentText>
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
            <Button variant="text" onClick={handleAdd}>Add availability</Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose}>Cancel</Button>
          <Button variant="text" onClick={handlePublish}>Publish</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default PublishFormDialog;
