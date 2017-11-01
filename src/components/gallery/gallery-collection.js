import React from 'react';

import Thumbnail from './gallery-thumbnail'

export default function(props) {

  const images = props.images.map((image, index) => {
    return <Thumbnail
            src={image.path}
            index={index}
            key={image._id}
            imageId={image._id}
            viewImage={props.viewImage}/>
  });


  return (
    <div className="gallery-thumbnails">
      {images}
    </div>
  )
}
