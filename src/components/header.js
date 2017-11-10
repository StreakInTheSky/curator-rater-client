import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { setCurrentUser, setAuthToken } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

import './header.css'

import AccountMenu from './account-menu'

export class Header extends React.Component{
  logOut() {
    this.props.history.push("/");
    this.props.dispatch(setCurrentUser(null));
    this.props.dispatch(setAuthToken(null));
    clearAuthToken();
  }

  render() {
    const loginButton = <Link to="/login" className="mock-button">Login</Link>
    const signUpButton = <Link to="/signup" className="mock-button">Sign Up</Link>

    let accountMenu;
    let addGalleryLink;
    let exploreLink;

    if (this.props.user) {
      accountMenu = <AccountMenu logOut={() => this.logOut()} />
      addGalleryLink = <Link className="header-nav-item" to="/curate">Create Gallery</Link>
      exploreLink = <Link to="/" className="header-nav-item">Explore</Link>
    } else if (this.props.location.pathname === '/login') {
      accountMenu = signUpButton
    } else if (this.props.location.pathname === '/signup') {
      accountMenu = loginButton
    } else {
      accountMenu = <div className="account-menu">{loginButton} {signUpButton}</div>
    }

    return (
      <header className="page-topper">
        <Link to="/" className="logo-link"><h1 className="header-logo">Curator-Rater</h1></Link>
        <div className="header-links">
          {exploreLink}
          {addGalleryLink}
        </div>
        {accountMenu}
      </header>
    )
  }
}

const mapStateToProps = state => ({
    user: state.auth.currentUser
});

export default withRouter(connect(mapStateToProps)(Header));
