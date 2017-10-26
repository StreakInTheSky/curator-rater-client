import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './header.css'

export default class Header extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <header className="page-topper">
        <Link to="/" className="header-logo"><h1>Curator-Rater</h1></Link>
        {/* <MainNav /> */}
        {/* <ProfileMenu /> */}
        <Link to="/login" className="mock-button">login</Link>
      </header>
    )
  }
}
