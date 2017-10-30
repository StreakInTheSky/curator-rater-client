import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { setCurrentUser, setAuthToken } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

import './header.css'

export class Header extends React.Component{
  logOut() {
    this.props.dispatch(setCurrentUser(null));
    this.props.dispatch(setAuthToken(null));
    clearAuthToken();
  }

  render() {
    const loginButton = <Link to="/login" className="mock-button">Login</Link>
    const signUpButton = <Link to="/signup" className="mock-button">Sign Up</Link>
    const logOutButton = <button onClick={()=>this.logOut()}>Log Out</button>
    let accountNav;

    if (this.props.loggedIn) {
      accountNav = logOutButton
    } else if (this.props.location.pathname === '/login') {
      accountNav = signUpButton
    } else if (this.props.location.pathname === '/signup') {
      accountNav = loginButton
    } else {
      accountNav = <div>{loginButton} or {signUpButton}</div>
    }
    // const accountNav = this.props.loggedIn ? logOutButton : loginButton;

    return (
      <header className="page-topper">
        <Link to="/" className="header-logo"><h1>Curator-Rater</h1></Link>
        {accountNav}
      </header>
    )
  }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(Header));
