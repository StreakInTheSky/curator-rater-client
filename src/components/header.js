import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import { setCurrentUser, setAuthToken } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

import './header.css'

import AccountMenu from './account-menu'

export class Header extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false
    }

    this.showMenu = this.showMenu.bind(this)
  }

  logOut() {
    this.props.history.push("/");
    this.props.dispatch(setCurrentUser(null));
    this.props.dispatch(setAuthToken(null));
    clearAuthToken();
  }

  showMenu() {
    this.setState({ showMenu: !this.state.showMenu })
  }

  render() {
    const loginButton = <Link to="/login" className="mock-button">Login</Link>
    const signUpButton = <Link to="/signup" className="mock-button">Sign Up</Link>
    let accountMenu;
    let navMenu;

    if (this.props.user) {
      accountMenu = <AccountMenu logOut={()=>this.logOut()} showMenu={this.showMenu} />
      navMenu = <ul className="header-nav">
        <li className="header-nav-item"><Link to="/" onClick={()=>this.showMenu()}>Explore</Link></li>
        <li className="header-nav-item"><Link to="/curate" onClick={()=>this.showMenu()}>Create Gallery</Link></li>
      </ul>
    } else if (this.props.location.pathname === '/login') {
      accountMenu = <ul className="account-menu">
        <li className="account-menu-item">{signUpButton}</li>
      </ul>
    } else if (this.props.location.pathname === '/signup') {
      accountMenu = <ul className="account-menu">
        <li className="account-menu-item">{loginButton}</li>
      </ul>
    } else {
      accountMenu = <ul className="account-menu">
        <li className="account-menu-item">{loginButton}</li>
        <li className="account-menu-item">{signUpButton}</li>
      </ul>
    }

    const mobileMenu = <div className="mobile-menu">
      {navMenu}
      {accountMenu}
    </div>

    return (
      <header className="page-topper">
        <div className="page-topper-container">
          <h1 className="header-logo"><Link to="/" className="logo-link">Curator-rater</Link></h1>
          <MediaQuery maxWidth={500}>
            <div className="mobile-nav">
              <i className="fa fa-bars hamburger-button" aria-hidden="true" onClick={()=>this.showMenu()}></i>
              {this.state.showMenu ? mobileMenu : null}
            </div>
          </MediaQuery>
          <MediaQuery minWidth={501}>
            <div className="header-links">
              {navMenu}
              {accountMenu}
            </div>
          </MediaQuery>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
    user: state.auth.currentUser
});

export default withRouter(connect(mapStateToProps)(Header));
