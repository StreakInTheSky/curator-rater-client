import React from 'react'
import { connect } from 'react-redux'

import Gallery from './gallery'
import UnauthHome from './unauth-home'
import * as actions from '../actions/gallery'

import './home.css'

export class Home extends React.Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchGalleries())
  }

  render() {
    if (!this.props.galleries) {
      return <p>Loading galleries</p>
    } else if (!this.props.user) {
      return <UnauthHome />
    } else {
      const galleries = this.props.galleries.map((gallery, index) => {
        return <Gallery
          key={index}
          gallery={gallery}
          ownGallery={gallery.user._id === this.props.user.id ? true : null}
          profileGallery={false}
          currentFavorites={this.props.user.favorites}
          currentUser={this.props.user.id}
        />;
      })

      return (
        <div>
          <h2 className="page-title">Explore</h2>
          <p className="page-description">Curate new galleries or rate some galleries by double clicking on your favorite images.</p>
          <main>
            {galleries}
          </main>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  galleries: state.gallery.galleries,
  user: state.auth.currentUser
})

export default connect(mapStateToProps)(Home)
