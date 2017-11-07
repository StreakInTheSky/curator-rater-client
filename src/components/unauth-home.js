import React from 'react'
import { connect } from 'react-redux'

import Gallery from './unauth-gallery'
import * as actions from '../actions/gallery'

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
        <p>Login or sign up and start curating new galleries or rating them.</p>
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
