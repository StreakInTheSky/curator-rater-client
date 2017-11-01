import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

export function AccountMenu(props) {
  // Links for PROFILE, SIGNOUT
  const username = props.user.username
  return(
    <ul className="account-menu">
      <li className="account-menu-item"><Link to={`/${username}`}>My Profile</Link></li>
      <li className="account-menu-item"><div className="mock-button" onClick={props.logOut}>Log Out</div></li>
    </ul>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.currentUser
})

export default connect(mapStateToProps)(AccountMenu)
