import React from 'react'

export default function ImageViewer(props) {
  return (
    <div className="gallery-image-viewer">
      <div className="viewed-image-container">
        <img className="viewed-image" src={props.image.path} alt="" onDoubleClick={()=> props.vote(props.image._id)}/>
      </div>
    </div>
  )
}
