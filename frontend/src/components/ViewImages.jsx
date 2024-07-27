import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// reference https://mui.com/material-ui/react-image-list/
export default function MasonryImageList ({ Images }) {
  return (
    <Box sx={{ width: '60%', height: 450, overflowY: 'scroll', alignSelf: 'center', border: '1px solid black', borderRadius: '8px' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {Images.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={item.base64}
              alt={item.id}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
