import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function StandardImageList ({ imageList }) {
  return (
    <ImageList sx={{ width: 500 }} cols={3} rowHeight={164}>
      {imageList.map((item) => (
        <ImageListItem key={item.id}>
          <img
            src={item.base64}
            alt={item.id}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
