import React from 'react'

export default function FollowButton(props) {
  console.log(props.following)
  if (props.following) {
    return <span className="mock-button follow-button unfollow-button" onClick={()=>props.unfollow(props.userId)}>Unfollow</span>
  }
  return <span className="mock-button follow-button" onClick={()=>props.follow(props.userId)}>Follow</span>
}
