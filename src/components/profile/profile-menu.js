import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileMenu(props) {
  return (
    <ul className="profile-menu">
      <li className="profile-menu-item"><Link to={`/${props.username}/following`}>following {props.following.length}</Link></li>
      <li className="profile-menu-item"><Link to={`/${props.username}/followers`}>followers {props.followers.length}</Link></li>
      <li className="profile-menu-item"><span>favorites</span></li>
    </ul>
  )
}
