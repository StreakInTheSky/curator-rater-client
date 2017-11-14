import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Gallery from './unauth-gallery'
import * as actions from '../actions/gallery'

import './home.css'

export class UnauthHome extends React.Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchGalleries())
  }
  render() {
    console.log('running')
    const galleries = this.props.galleries.map((gallery, index) => {
      return <Gallery
        key={index}
        gallery={gallery}
        profileGallery={false}
      />;
    })

    return (
      <div>
        <div className="page-hero">
          <p className="tagline">Share your vision with us.</p>
          <p className="sub-tagline">Whether you're a photographer, designer, tastemaker, or just want to share your ideas. Curator-rater is here to help you find your audience.</p>
          <Link to="/signup" className="mock-button">Sign Up</Link>
        </div>
        <main>
          {galleries}
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  galleries: state.gallery.galleries
})

export default connect(mapStateToProps)(UnauthHome)
