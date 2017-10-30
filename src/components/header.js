import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { setCurrentUser, setAuthToken } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

import './header.css'

import AccountMenu from './account-menu'

export class Header extends React.Component{
  logOut() {
    this.props.dispatch(setCurrentUser(null));
    this.props.dispatch(setAuthToken(null));
    clearAuthToken();
  }

  render() {
    const loginButton = <Link to="/login" className="mock-button">Login</Link>
    const signUpButton = <Link to="/signup" className="mock-button">Sign Up</Link>

    let accountMenu;
    let addGalleryLink;

    if (this.props.loggedIn) {
      accountMenu = <AccountMenu logOut={() => this.logOut()} />
      addGalleryLink = <Link to="/curate">Create Gallery</Link>
    } else if (this.props.location.pathname === '/login') {
      accountMenu = signUpButton
    } else if (this.props.location.pathname === '/signup') {
      accountMenu = loginButton
    } else {
      accountMenu = <div>{loginButton} or {signUpButton}</div>
    }

    return (
      <header className="page-topper">
        <Link to="/" className="logo-link"><h1 className="header-logo">Curator-Rater</h1><span className="home-text">home</span></Link>
        {addGalleryLink}
        {accountMenu}
      </header>
    )
  }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(Header));
