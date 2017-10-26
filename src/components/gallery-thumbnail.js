import React from 'react'

export default function Thumbnail(props) {
  const toggleSelectImage = () => {
    props.viewImage(props.index)
  }

  return (
    <div className={props.selected ? "thumbnail-container selected" : "thumbnail-container"}>
      <img className="thumbnail" src={props.src} onClick={toggleSelectImage} />
    </div>
  )
}
