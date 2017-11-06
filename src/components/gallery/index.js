import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../../actions/gallery'
import { voteImage } from '../../actions/image'
import ImageViewer from './gallery-viewer'
import GalleryCollection from './gallery-collection';

import './gallery.css'

export class Gallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentImage: this.props.gallery.images[0],
      favorited: false,
    }

    this.viewImage = this.viewImage.bind(this)
    this.vote = this.vote.bind(this)
  }

  viewImage(imgIndex) {
    this.setState({currentImage: this.props.gallery.images[imgIndex]})
  }

  addFavorite(galleryId) {
    this.setState({ favorited: true })
    this.props.dispatch(actions.addFavoriteGallery(galleryId, this.props.user.id))
  }

  removeFavorite(galleryId) {
    this.props.dispatch(actions.removeFavoriteGallery(galleryId, this.props.user.id))
  }

  vote(imageId) {
    const userImageIds = [];
    this.props.user.galleries.forEach((gallery) => {
      gallery.images.forEach(image => {
        userImageIds.push(image._id)
      })
    })

    if (userImageIds.indexOf(imageId) >= 0) {
      alert("Can't vote for your own image")
    } else {
      this.props.dispatch(voteImage(imageId, this.props.user.id))
    }
  }

  render() {
    if (!this.props.user) {
      return <p>Loading gallery...</p>
    } else {
      const {title, description, user, images, _id, id} = this.props.gallery
      const favoriteIds = this.props.currentFavorites.map(gallery => gallery._id)
      const galleryId = id ? id : _id

      const checkFavorited = favoriteIds.indexOf(galleryId) >= 0 || this.state.favorited
      ? <span className="favorite-star favorited" onClick={()=>this.removeFavorite(galleryId)}>&#9733;</span>
      : <span className="favorite-star" onClick={()=>this.addFavorite(galleryId)}>&#9734;</span>

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
            <ImageViewer image={this.state.currentImage} vote={this.vote}/>
            <GalleryCollection images={images} viewImage={this.viewImage} userVotes={this.props.user.upvoted}/>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.currentUser
})

export default connect(mapStateToProps)(Gallery)
