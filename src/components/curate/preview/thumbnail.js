import React from 'react'

export default function Thumbnail(props) {
  const deleteImage = () => {
    props.deleteImage(props.index);
    props.unviewImage();
  }

  const checkIfSelected = () => {
    if (props.src === props.currentImage) {
      return true
    } else {
      return false
    }
  }

  const viewImage = () => { props.viewImage(props.index); }

  return (
    <div className="thumbnail-surround">
      <span className="image-delete" onClick={deleteImage}><i className="fa fa-trash-o" aria-hidden="true"></i></span>
      <div className={ checkIfSelected() ? "thumbnail-container selected" : "thumbnail-container"} onClick={viewImage} >
        <img className="thumbnail" src={props.src} alt="" />
      </div>
    </div>

  )
}
