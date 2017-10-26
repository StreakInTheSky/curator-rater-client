import React from 'react'
import { Link } from 'react-router-dom'

import UserList from './userlist'

export default function ProfileMenu(props) {
  return (
    <div className="profile-menu">
      <ul style={styles.ul}>
        <li className="user-menu-item"><Link style={styles.links}  to={`/${props.username}/following`}>following {props.following.length}</Link></li>
        <li className="user-menu-item"><Link style={styles.links}  to={`/${props.username}/followers`}>followers {props.followers.length}</Link></li>
        <li className="user-menu-item"><span style={styles.links}>favorites</span></li>
      </ul>
    </div>
  )
}

const styles = {
  ul: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between'
  }
}
