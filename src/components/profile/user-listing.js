import React from 'react'
import { Link } from 'react-router-dom'

export default function UserListing(props) {
  const followUser = () => {
    props.followUser(props.id)
  }

  return (
      <li>
        <Link to={`/${props.username}`} >{props.username}</Link>
        <button className="follow-button" onClick={followUser}>follow</button>
      </li>
  )
}
