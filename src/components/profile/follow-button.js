import React from 'react'

export default function FollowButton(props) {
  if (props.following) {
    return <span className="mock-button follow-button unfollow-button" onClick={()=>props.unfollow(props.userId)}>following</span>
  }
  return <span className="mock-button follow-button" onClick={()=>props.follow(props.userId)}>follow</span>
}
