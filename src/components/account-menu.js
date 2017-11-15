import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

export function AccountMenu(props) {
  const logOut = () => {
    props.logOut()
    props.showMenu()
  }

  const username = props.user.username
  return(
    <ul className="account-menu">
      <li className="account-menu-item"><Link to={`/${username}`} onClick={()=>props.showMenu()}>My Galleries</Link></li>
      <li className="account-menu-item"><div className="mock-button" onClick={()=>logOut()}>Log Out</div></li>
    </ul>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.currentUser
})

export default connect(mapStateToProps)(AccountMenu)
