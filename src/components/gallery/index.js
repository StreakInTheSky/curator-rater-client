import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../../actions/gallery'
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

  addFavorite() {
    this.props.dispatch(actions.addFavoriteGallery(this.props.gallery._id, this.props.user.id))
  }

  removeFavorite() {
    this.props.dispatch(actions.removeFavoriteGallery(this.props.gallery._id, this.props.user.id))
  }

  render() {
    const {title, description, user, images, _id } = this.props.gallery
    const id = _id;
    // console.log(this.props.gallery)
    const checkFavorited = this.props.user.favorites.indexOf(id) >= 0
    ? <span className="favorite-star favorited" onClick={()=>this.removeFavorite()}>&#9733;</span>
    : <span className="favorite-star" onClick={()=>this.addFavorite()}>&#9734;</span>

    const favoriteStar = this.props.ownGallery ? null : checkFavorited;

    const galleryUsername = <p className="gallery-user"><Link to={`/${user.username}`}>{user.username}</Link></p>
    const displayUsername = this.props.profileGallery ? null : galleryUsername

    return (
      <div className="gallery">
        <div className="gallery-info">
          <h3 className="gallery-name">{title}</h3>
          {favoriteStar}
          {displayUsername}
          <p className="gallery-description">{description}</p>
          {/* <Hashtags tags={tags} /> */}
        </div>
        <div className="gallery-images">
          <ImageViewer image={this.state.currentImage}/>
          <GalleryCollection images={images} viewImage={this.viewImage}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.currentUser
})

export default connect(mapStateToProps)(Gallery)
