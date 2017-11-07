import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

import ImageViewer from './gallery-viewer'
import GalleryCollection from './gallery-collection';

import './gallery.css'

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
    const { title, description, user, images } = this.props.gallery

    const galleryUsername = <p className="gallery-user"><Link to={`/${user.username}`}>{user.username}</Link></p>
    const displayUsername = this.props.profileGallery ? null : galleryUsername

    return (
      <div className="gallery">
        <div className="gallery-info">
          <h3 className="gallery-name">{title}</h3>
          {displayUsername}
          <p className="gallery-description">{description}</p>
          {/* <Hashtags tags={tags} /> */}
        </div>
        <div className="gallery-images">
          <ImageViewer image={this.state.currentImage}/>
          <GalleryCollection images={images} viewImage={this.viewImage} />
        </div>
      </div>
    )

  }
}

const mapStateToProps = (state) => ({
  user: state.auth.currentUser
})

export default connect(mapStateToProps)(Gallery)
