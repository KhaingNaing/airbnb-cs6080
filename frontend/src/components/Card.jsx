import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography';
import { CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PublishFormDialog from './PublishFormDialog';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import CardMedia from '@mui/material/CardMedia';
import Alert from '@mui/material/Alert';
import ReviewList from './ReadRating';

const url = 'http://localhost:5005/listings/';

const ColorAlerts = (severityLevel, displayText) => {
  return (
    <Alert severity={severityLevel} color={severityLevel}>
      {displayText}
    </Alert>
  );
}

// reference: https://mui.com/material-ui/react-menu/
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const Unpublish = async (token, id) => {
  const response = await fetch(url + 'unpublish/' + id, {
    method: 'PUT',
    body: JSON.stringify({
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
  }
}

const deleteListing = async (token, id, setReload) => {
  const response = await fetch(url + id, {
    method: 'DELETE',
    body: JSON.stringify({
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
    setReload(true);
  }
}

const ListCard = ({ props, id, screen, bookings, reload, setReload }) => {
  const [goLive, setGoLive] = React.useState(false);
  const [disablePublish, setDisablePublish] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const open = Boolean(anchorEl);
  const [averageRating, setArating] = React.useState(0);

  const navigate = useNavigate();
  React.useEffect(() => {
    if (props.reviews.length > 0) {
      // intial value of 0, accumulate, review (currentItem)
      setArating(props.reviews.reduce((acc, review) => acc + (review.rating), 0) / props.reviews.length);
    }
  }, [props]);

  React.useEffect(() => {
    const checktoken = localStorage.getItem('token');
    if (checktoken) {
      setToken(checktoken);
      setDisablePublish(props.published);
      if (bookings) {
        for (const book of bookings) {
          if (parseInt(book.listingId, 10) === id) {
            setStatus(book.status);
          }
        }
      }
    }
  }, [props.token, bookings])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    deleteListing(token, id, setReload);
  }
  const handleDialog = () => {
    setGoLive(true);
  }
  const handleUnpublish = () => {
    Unpublish(token, id);
    setDisablePublish(false);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={props.thumbnail}
        alt='PIC'
      />
      <Divider />
      <CardContent sx={{ padding: 0, ml: 2.5, mr: 3, mt: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {props.title}
            {disablePublish && (<Typography variant="h6">Live <LiveTvIcon fontSize='small' /></Typography>)}
            {!disablePublish && (<UnpublishedIcon fontSize='small' />)}
          </div>
        </Typography>
        <Typography variant="body2" color="text.secondary">Type:{props.metadata.type}</Typography>
        <Typography variant="body2" color="text.secondary">Beds:{props.metadata.bedNum}</Typography>
        <Typography variant="body2" color="text.secondary">Bath:{props.metadata.bathNum}</Typography>
        <Typography variant="body2" color="text.secondary">Reviews:{props.reviews.length}</Typography>
        <ReviewList rating={parseFloat(averageRating.toFixed(1))} viewOption='number' reviews={props.reviews} />
        {/* <ReviewList rating={parseFloat(averageRating.toFixed(1))} /> */}
        <Stack direction="row">
          <AttachMoneyIcon fontSize="small" sx={{ padding: 0 }}/>
          <Typography variant="body2" color="text.secondary">{props.price} AUD (per night)</Typography>
        </Stack>
        {
        status === 'accepted'
          ? (ColorAlerts('success', 'Booking ACCEPTED'))
          : status === 'pending'
            ? (ColorAlerts('info', 'Booking PENDING'))
            : (null)
        }
      </CardContent>
      <CardActions>
        {(screen === 'hostedlisting') && (
          <div>
          <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Actions
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
          <MenuItem onClick={() => navigate(`/editlisting/${id}`)} disableRipple>
            <EditIcon />
            Edit
          </MenuItem>
          {!disablePublish && <MenuItem onClick={handleDialog} disableRipple>
            <PublishIcon />
            Publish
          </MenuItem>}
          {disablePublish && <MenuItem onClick={handleUnpublish} disableRipple>
            <UnpublishedIcon />
            Unpublish
          </MenuItem>}
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleDelete} disableRipple>
            <ArchiveIcon />
            Archive
          </MenuItem>
          <MenuItem onClick={() => navigate(`/request/${id}`)} disableRipple>
            <EventAvailableIcon />
            Bookings
          </MenuItem>
          <PublishFormDialog openDialog={goLive} setOpenDialog={setGoLive} token={token} listingID={id} setDisable={setDisablePublish} />
          </StyledMenu>
          </div>
        )}
        {(screen === 'landingpage') && (
          <div>
          <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Actions
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
          <MenuItem onClick={() => navigate(`/viewlisting/${id}`)} disableRipple>
            <VisibilityIcon />
            View Detail
          </MenuItem>
          </StyledMenu>
          </div>
        )}
    </CardActions>
    </Card>
  );
}

export default ListCard;
