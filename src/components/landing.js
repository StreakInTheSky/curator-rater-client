import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './landing.css'

export class LandingPage extends React.Component {
  render() {
    return (
      <div className="page-content">
        <div className="page-hero">
          <p className="tagline">Share your vision with us.</p>
          <p className="sub-tagline">Whether you're a photographer, designer, tastemaker, or just want to share your ideas. Curator-rater is here to help you find your audience.</p>
          <Link to="/signup" className="mock-button">Sign Up</Link>
        </div>
      </div>
    )
  }
}


export default connect()(LandingPage)
