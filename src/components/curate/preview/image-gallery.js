import React from 'react'

import Thumbnail from './thumbnail'
import ImageViewer from './image-viewer'

export default function ImageGallery(props) {
  const images = props.images.map((image, index) => {
    return <Thumbnail
            src={image}
            key={index}
            index={index}
            deleteImage={props.deleteImage}
            viewImage={props.viewImage}
            unviewImage={props.unviewImage}
            currentImage={props.currentImage} />
  });


  return (
    <section className={props.currentImage ? "gallery-images modal" : "gallery-images"} >
      <div className={props.currentImage ? "modal-background" : "hidden"} onClick={props.unviewImage} />
      <div className="image-view-content">
        <h5 className={props.currentImage ? "hidden" : "" }>Images in gallery:</h5>
        <ImageViewer image={props.currentImage} unviewImage={props.unviewImage}/>
        <div className="thumbnails">
          {images}
        </div>
      </div>
    </section>
  )
}
