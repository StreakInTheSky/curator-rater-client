import React from 'react'

export default function ImageViewer(props) {
  const heart = props.isUpvoted
  ? <div className="heart upvoted">&#9829;</div>
  : <div className="heart" onClick={()=> props.vote(props.image._id)} >&#9825;</div>

  return (
    <div className="gallery-image-viewer">
      <div className="viewed-image-container">
        <img className="viewed-image" src={props.image.path} alt="" onDoubleClick={()=> props.vote(props.image._id)} />
        {heart}
      </div>
    </div>
  )
}
