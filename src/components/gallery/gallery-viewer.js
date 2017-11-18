import React from 'react'

export default function ImageViewer(props) {
  const isUpvoted = props.userVotes.indexOf(props.image._id) !== -1;
  const handleVotes = () => {
    if (isUpvoted) {
      alert('already voted')
      return null;
    }
    props.vote(props.image._id)
  }

  const heart = isUpvoted
  ? <div className="heart upvoted">&#9829;</div>
  : <div className="heart" onClick={()=>handleVotes()} >&#9825;</div>

  return (
    <div className="gallery-image-viewer">
      <div className="viewed-image-container">
        <img className="viewed-image" src={props.image.path} alt="" onDoubleClick={()=>handleVotes()} />
        {heart}
      </div>
    </div>
  )
}
