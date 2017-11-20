import React from 'react'

import Thumbnail from './thumbnail'
import ImageViewer from './image-viewer'

import './preview.css'

export default function GalleryPreview(props) {
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
    <section className={props.currentImage ? "gallery-preview modal" : "gallery-preview"} >
      <div className={props.currentImage ? "modal-background" : "hidden"} onClick={props.unviewImage} />
      <div className={props.currentImage ? "gallery-preview-modal" : "gallery-preview-content"}>
        <h5 className={props.currentImage ? "hidden" : "gallery-preview-header" }>Gallery preview:</h5>
        <ImageViewer image={props.currentImage} unviewImage={props.unviewImage}/>
        <div className={props.currentImage ? "preview-thumbnails preview-thumbnails-modal" : "preview-thumbnails"}>
          {images}
        </div>
      </div>
    </section>
  )
}
