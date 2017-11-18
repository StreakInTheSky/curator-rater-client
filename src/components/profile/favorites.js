import React from 'react'
import { connect } from 'react-redux'

import Gallery from '../gallery'

import './profile.css'

export class UserFavorites extends React.Component {
  render() {
    const profile = this.props.profile;

    const galleries = profile.favorites.map((gallery, index) => {
      return <Gallery
        key={index}
        gallery={gallery}
        ownGallery={profile.id === this.props.user.id ? true : null}
        currentFavorites={this.props.user.favorites}
        currentUser={this.props.user}
      />;
    });

    return (
      <div>
        {galleries}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  profile: state.profile,
  user: state.auth.currentUser
});

export default connect(mapStateToProps)(UserFavorites)
