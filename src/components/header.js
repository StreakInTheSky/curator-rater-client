import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './header.css'

import LoginForm from './login-form';

export function Header(props) {
  //
  const mainNav = props.loggedIn ? <button>Sign Out</button> : <LoginForm />
  return (
    <header className="page-topper">
      <Link to="/" className="header-logo"><h1>Curator-Rater</h1></Link>
      {mainNav}
    </header>
  )
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Header);
