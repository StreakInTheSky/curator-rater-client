import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './landing.css'

export class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page-content">
        <section className="landing-page-section page-hero">
          <p className="tagline">Show us what you got.</p>
          <p className="sub-tagline">If you're a photographer, designer, tastemaker, or just want to share your ideas. Find your audience in our community.</p>
        </section>
        <main className="site-descriptions">
          <section className="landing-page-section path-choice curate-path">
            <h2 className="section-header">Curate</h2>
            <p className="section-tagline">
              <span className="tagline-text"><span>Have something to share? Curate a gallery, visual essay, or story, and see what others think.</span></span>
            </p>
            <Link to="/signup" className="mock-button">Sign Up</Link>
            <div className="background">
              <div className="background-image"></div>
              <p className="image-user">See more from <Link to="/ross">@ross</Link></p>
            </div>
          </section>
          <section className="landing-page-section path-choice rate-path">
            <h2 className="section-header">Rate</h2>
            <p className="section-tagline">
              <span className="tagline-text"><span>You have opinions? Let others know what you think of their work by rating galleries.</span></span>
            </p>
            <Link to="/signup" className="mock-button">Sign Up</Link>
            <div className="background">
              <div className="background-image"></div>
              <p className="image-user">See more from <Link to="/demo">@demo</Link></p>
            </div>
          </section>
        </main>
      </div>
    )
  }
}


export default connect()(LandingPage)
