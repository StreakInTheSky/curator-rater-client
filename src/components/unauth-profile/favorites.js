import React from 'react'
import { connect } from 'react-redux'

import Gallery from '../unauth-gallery'

export class UserFavorites extends React.Component {
  render() {
    const profile = this.props.profile;

    const galleries = profile.favorites.map((gallery, index) => {
      return <Gallery
        key={index}
        gallery={gallery}
      />;
    });

    return (
      <div>
        {galleries}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(UserFavorites)
