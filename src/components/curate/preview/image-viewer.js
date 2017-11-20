import React from 'react'

export default function ImageViewer(props) {
  return (
    <div className={props.image ? "image-preview-container" : "hidden"}>
      <div className="modal-close"  onClick={props.unviewImage} >close</div>
      <img className="image-preview" src={props.image} alt="" />
    </div>
  )
}
