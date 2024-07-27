import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import Tooltip from '@mui/material/Tooltip';

const url = 'http://localhost:5005/listings/';
const typeOptions = {
  0: 'Apartment',
  1: 'House'
};

// Reference: https://mui.com/material-ui/react-list/
const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function ListDetail ({ token, route, func, props, navi }) {
  const [title, setTitle] = React.useState('');
  const [address, setAddress] = React.useState({
    street: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
  });
  const [addressStr, setAddressStr] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [thumbnail, setThum] = React.useState('');
  const [type, setType] = React.useState('');
  const [bathNum, setBathNum] = React.useState(1);
  const [bedNum, setBedNum] = React.useState(1);
  const [amen, setAmen] = React.useState('');
  const [metadata, setMeta] = React.useState('');
  const navigate = useNavigate();
  const [fileExist, setfileExist] = React.useState(false);

  // imageList is a list of imageDict with [ {imageId: int, base64:..., thumbnail: boolean}]
  const [imageList, setImageList] = React.useState([]);

  React.useEffect(() => {
    if (props) {
      setTitle(props.title);
      setAddress({ ...props.address });
      setPrice(props.price);
      setThum(props.thumbnail);
      if (props.thumbnail) {
        setfileExist(true);
      }
      // if (props.metadata.type) {
      setType(props.metadata.type);
      setBathNum(props.metadata.bathNum);
      setBedNum(props.metadata.bedNum);
      setAmen(props.metadata.amen);
      setImageList(props.metadata.imageList);
    }
  }, [props]);

  React.useEffect(() => {
    const addressValues = Object.values(address);
    if (addressValues.length > 0 && addressValues.every(val => val !== undefined && val !== null)) {
      setAddressStr(addressValues.join(', '));
    }
  }, [address]);

  React.useEffect(() => {
    setMeta({ type, bathNum, bedNum, amen, imageList });
  }, [type, bathNum, bedNum, amen, imageList]);

  // when use
  const create = async () => {
    const response = await fetch(url + route, {
      method: func,
      body: JSON.stringify({
        title, address, price, thumbnail, metadata
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
      navigate('/hostedlisting');
    }
  };

  const checkAllFilled = () => {
    if (
      fileExist === true &&
      title !== '' &&
      Object.keys(address).length === 5 &&
      price !== '' &&
      type !== '' &&
      bathNum !== '' &&
      bedNum !== '' &&
      amen !== ''
    ) {
      create();
    } else if (Object.keys(address).length !== 5) {
      alert('Please follow the address format given in the placeholder')
    } else if (fileExist === false) {
      alert('Please set a thumbnail image for your property');
    } else {
      alert('Please fill out all the required fields');
    }
  }

  const handleDeleteImage = (id) => {
    for (const img of imageList) {
      if (img.id === id && img.thumbnail) {
        setThum('');
        setfileExist(false);
      }
    }
    const updatedList = imageList.filter(image => image.id !== id);
    setImageList(updatedList);
  }

  const handleSetThumbnail = (id) => {
    const updatedList = imageList.map(image => {
      if (image.id === id) {
        // set thumbnail
        setThum(image.base64);
        setfileExist(true);
        return { ...image, thumbnail: true };
      } else {
        return { ...image, thumbnail: false };
      }
    });
    setImageList(updatedList);
    console.log(updatedList);
  }

  const handleChange = (e) => {
    setType(e.target.value);
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await getBase64(file);

    // Add image to the image list
    const newImage = {
      id: imageList.length + 1,
      name: file.name,
      base64,
      thumbnail: false,
    };
    setImageList([...imageList, newImage]);
  }
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    })
  }
  const cancelCreate = () => {
    navigate('/hostedlisting');
  }
  const handleAddress = (e) => {
    const addressString = e.target.value;
    setAddressStr(addressString);
    const addressArray = e.target.value.split(', ');
    if (addressArray.length === 5) {
      const addressDict = {
        street: addressArray[0],
        city: addressArray[1],
        state: addressArray[2],
        postcode: addressArray[3],
        country: addressArray[4]
      }
      setAddress({ ...addressDict })
    }
  }
  return (
  <Stack direction={'column'}>
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <TextField
        label="Title"
        sx={{ m: 1, width: '25ch' }}
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextField
        label="PropertyAddress: street, city, state, postcode, country"
        sx={{ m: 1, width: '40ch' }}
        type="text"
        value={addressStr}
        onChange={handleAddress}
        placeholder='street, city, state, postcode, country'
      />
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <input
          type="file"
          onChange={handleUpload}
        />
        <FormHelperText id="outlined-weight-helper-text">Thumbnail</FormHelperText>
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={price}
            label="Price"
            type='number'
            onChange={e => {
              // regular expression /[^0-9]/g matches any char outside of range (0-9) and replace them with empty string
              const numericVal = e.target.value.replace(/[^0-9]/g, '');
              setPrice(numericVal);
            }}
          />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel id="demo-simple-select-label">Property Types:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Property Types"
          onChange={handleChange}
        >
          <MenuItem value={typeOptions[0]}>{typeOptions[0]}</MenuItem>
          <MenuItem value={typeOptions[1]}>{typeOptions[1]}</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Number of bathrooms"
        sx={{ m: 1, width: '25ch' }}
        type="number"
        value={bathNum}
        onChange={e => {
          if (e.target.value < 1) {
            e.preventDefault();
          } else {
            setBathNum(e.target.value);
          }
        }}
      />
      <TextField
        label="Number of beds"
        sx={{ m: 1, width: '25ch' }}
        type="number"
        value={bedNum}
        onChange={e => {
          if (e.target.value < 1) {
            e.preventDefault();
          } else {
            setBedNum(e.target.value);
          }
        }}
      />
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Amen</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          label="Amen"
          onChange={e => setAmen(e.target.value)}
          value={amen}
        />
      </FormControl>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={checkAllFilled}>{(route === 'new') ? 'Create' : 'Save'}</Button>
        <Button variant="contained" onClick={cancelCreate}>Cancel</Button>
      </Stack>
    </Box>
    <Grid item xs={12} md={6}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Property Images
      </Typography>
      <Demo>
        <List>
          {imageList.map((image, index) => (
            <ListItem key={index}
              secondaryAction={
                <div>
                <Tooltip title="Delete">
                  <span>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteImage(image.id)}>
                    <DeleteIcon />
                  </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Set as thumbnail">
                  <span>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleSetThumbnail(image.id)} disabled={image.thumbnail}>
                    <ImageIcon />
                  </IconButton>
                  </span>
                </Tooltip>
                </div>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={image.name}
                secondary={image.thumbnail ? 'Currently set as thumbnail' : (fileExist === false) ? 'Don\'t forget to set a thumbnail using the set thumbnail button on the right' : null}
              />
            </ListItem>
          ))}
        </List>
      </Demo>
    </Grid>
  </Stack>
  );
}
export default ListDetail;
