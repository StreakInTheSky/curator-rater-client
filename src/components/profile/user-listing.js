import React from 'react'
import { Link } from 'react-router-dom'

export default function UserListing(props) {
  const followButton = props.following.indexOf(props.userId) >= 0 || props.followed
  ? <span className="mock-button follow-button unfollow-button" onClick={()=>props.unfollow(props.userId)}>following</span>
  : <span className="mock-button follow-button" onClick={()=>props.follow(props.userId)}>follow</span>

  return (
      <li className="user-list-listing">
        <Link to={`/${props.username}`} >{props.username}</Link>
        {props.currentUserId === props.userId ? null : followButton}
      </li>
  )
}
