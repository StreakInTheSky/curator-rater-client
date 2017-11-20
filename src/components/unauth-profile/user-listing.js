import React from 'react'
import { Link } from 'react-router-dom'

export default function UserListing(props) {
  return (
      <li className="user-list-listing">
        <Link to={`/${props.username}`} >{props.username}</Link>
      </li>
  )
}
