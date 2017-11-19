import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'

import ImageViewer from './gallery-viewer'
import GalleryCollection from './gallery-collection';

export class Gallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentImage: this.props.gallery.images[0]
    }

    this.viewImage = this.viewImage.bind(this)
  }

  viewImage(imgIndex) {
    this.setState({currentImage: this.props.gallery.images[imgIndex]})
  }

  render() {
    const { title, description, user, images, favorited_by } = this.props.gallery

    const favoritedAmount = favorited_by.length
    const galleryUsername = <p className="gallery-user"><Link to={`/${user.username}`}>@{user.username}</Link></p>
    const displayUsername = this.props.profileGallery ? null : galleryUsername

    return (
      <div className="gallery">
        <MediaQuery minWidth={501}>
          <div className="gallery-info">
            <h3 className="gallery-name">{title}</h3>
            <p className="favorite-amount">favorited by {favoritedAmount}</p>
            {displayUsername}
            <p className="gallery-description">{description}</p>
            {/* <Hashtags tags={tags} /> */}
          </div>
        </MediaQuery>
        <div className="gallery-images">
          <ImageViewer image={this.state.currentImage}/>
          <GalleryCollection images={images} viewImage={this.viewImage} />
        </div>
        <MediaQuery maxWidth={500}>
          <div className="gallery-info">
            <h3 className="gallery-name">{title}</h3>
            <p className="favorite-amount">favorited by {favoritedAmount}</p>
            {displayUsername}
            <p className="gallery-description">{description}</p>
            {/* <Hashtags tags={tags} /> */}
          </div>
        </MediaQuery>
      </div>
    )

  }
}

const mapStateToProps = (state) => ({
  user: state.auth.currentUser
})

export default connect(mapStateToProps)(Gallery)
