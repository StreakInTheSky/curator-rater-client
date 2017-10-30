import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

export function AccountMenu(props) {
  // Links for PROFILE, SIGNOUT
  const username = props.user.username
  return(
    <ul>
      <li><Link to={`/${username}`}>My Profile</Link></li>
      <li><div className="mock-button" onClick={props.logOut}>Log Out</div></li>
    </ul>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.currentUser
})

export default connect(mapStateToProps)(AccountMenu)
