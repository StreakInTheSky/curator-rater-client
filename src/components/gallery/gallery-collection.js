import React from 'react';

import Thumbnail from './gallery-thumbnail'

export default function(props) {
  const images = props.images.map((image, index) => {
    return <Thumbnail
            currentImage={image === props.currentImage ? true : false}
            src={image.path}
            index={index}
            key={image._id}
            imageId={image._id}
            upvotes={image.upvoted_by}
            viewImage={props.viewImage}
            isUpvoted={props.userVotes.indexOf(image._id) >= 0}
          />
  });

  return (
    <div className="gallery-thumbnails">
      {images}
    </div>
  )
}
