import React from 'react'

export default function ImageViewer(props) {
  return (
    <div className={props.image ? "image-viewer-container" : "hidden"}>
      <div className="close-modal"  onClick={props.unviewImage} >close</div>
      <img className="viewed-image" src={props.image} />
    </div>
  )
}
