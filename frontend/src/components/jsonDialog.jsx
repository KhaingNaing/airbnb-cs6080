import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import FormControl from '@mui/material/FormControl';

const url = 'http://localhost:5005/listings/';

function SimpleDialog (props) {
  const { onClose, setValue, open, title, address, price, thumbnail, metadata, token, setReload } = props;
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [fileUploaded, setFileUploaded] = React.useState(false);
  const handleClose = () => {
    onClose();
  };
  const handleUpload = () => {
    if (selectedFile) {
      if (selectedFile.type === 'application/json') {
        console.log('File is a JSON file ', selectedFile);
        setValue(selectedFile);
        setFileUploaded(true);
      } else {
        alert('Please upload a JSON file.')
      }
    }
  }
  const handleJSON = async (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0])
  }
  const handleCreate = async () => {
    if (fileUploaded) {
      const response = await fetch(url + 'new', {
        method: 'POST',
        body: JSON.stringify({
          title, address, price, thumbnail, metadata
        }),
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert('success');
        handleClose();
        setReload(true);
        setFileUploaded(false);
      }
    } else {
      alert('Please upload the file by clicking the Upload first.')
    }
  }
  return (
    <Dialog open={open}>
      <DialogTitle>Create Listing by a Json file</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Please upload your json file.
          </DialogContentText>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <input
              type="file"
              onChange={(e) => handleJSON(e)}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose}>Cancel</Button>
          <Button variant="text" onClick={handleUpload}>Upload</Button>
        </DialogActions>
        <Button variant="text" onClick={handleCreate}>Create</Button>
    </Dialog>
  );
}

export default function SimpleDialogForJson (props) {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [token, setToken] = React.useState(null);

  const [title, setTitle] = React.useState('');
  const [address, setAddress] = React.useState({});
  const [price, setPrice] = React.useState('');
  const [thumbnail, setThum] = React.useState('');
  const [metadata, setMeta] = React.useState({});
  const [imageList, setImageList] = React.useState([]);

  React.useEffect(() => {
    const checktoken = localStorage.getItem('token');
    if (checktoken) {
      setToken(checktoken);
    }
  }, [props.token])

  React.useEffect(() => {
    if (props.openDialog) {
      handleClickOpen();
      props.setOpenDialog(false);
    }
  }, [props.openDialog]);

  const appendImageList = (base64) => {
    const imageID = imageList.length + 1
    const newImage = {
      id: imageID,
      name: `image${imageID}`,
      base64,
      thumbnail: true,
    };
    setImageList([...imageList, newImage]);
  }

  const parseJSONFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        console.log('Extracted info from JSON: ', data);
        setTitle(data.title);
        setAddress(data.address);
        setPrice(data.price);
        setThum(data.thumbnail);
        appendImageList(data.thumbnail);
        setMeta(prev => ({
          ...prev,
          type: data.metadata.type,
          bathNum: data.metadata.bathNum,
          bedNum: data.metadata.bedNum,
          amen: data.metadata.amen
        }))
      } catch (error) {
        console.error('Error parsing JSON file: ', error);
      }
    }
    reader.readAsText(file);
  }
  React.useEffect(() => {
    if (file && file !== undefined) {
      parseJSONFile(file);
    }
  }, [file])

  React.useEffect(() => {
    setMeta(prev => ({ ...prev, imageList }))
  }, [imageList])

  React.useEffect(() => {
    console.log(metadata)
  }, [metadata]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.setOpenDialog(false);
  };

  return (
    <div>
      <SimpleDialog
        setValue={setFile}
        open={open}
        onClose={handleClose}
        title={title}
        address={address}
        price={price}
        thumbnail={thumbnail}
        metadata={metadata}
        token={token}
        setReload = {props.setReload}
      />
    </div>
  );
}
