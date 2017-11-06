import React from 'react'

export default function Thumbnail(props) {
  const toggleSelectImage = () => {
    props.viewImage(props.index)
  }

  const heart = props.isUpvoted ? <div className="heart">&#9829;</div> : null

  return (
    <div className={props.selected ? "thumbnail-container selected" : "thumbnail-container"} onClick={toggleSelectImage}>
      {heart}
      <img className="thumbnail" src={props.src} alt="" />
    </div>
  )
}
