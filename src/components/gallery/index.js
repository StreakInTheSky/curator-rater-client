import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'

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
      showMoreInfo: false,
      favorited: false,
      favoritedAmount: 0
    }

    this.viewImage = this.viewImage.bind(this)
    this.vote = this.vote.bind(this)
  }

  componentDidMount() {
    this.checkFavorited(this.props.currentUser.favorites)
    this.setState({favoritedAmount: this.props.gallery.favorited_by.length})
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.gallery._id !== nextProps.gallery._id){
      this.setState({currentImage: nextProps.gallery.images[0]})
    }
    this.checkFavorited(nextProps.currentUser.favorites)
  }

  checkFavorited(userFavorites) {
    const galleryId = this.props.gallery._id ? this.props.gallery._id : this.props.gallery.id
    const favoriteIds = userFavorites.map(gallery => {
      if(gallery._id) {
        return gallery._id
      }
      return gallery
    })
    if (favoriteIds.indexOf(galleryId) !== -1) {
      this.setState({favorited: true})
    } else {
      this.setState({favorited: false})
    }
  }

  viewImage(imgIndex) {
    this.setState({currentImage: this.props.gallery.images[imgIndex]})
  }

  addFavorite(galleryId) {
    if (this.props.ownGallery) {
      return null;
    }
    this.setState({favoritedAmount: this.props.gallery.favorited_by.length + 1})
    this.props.dispatch(actions.addFavoriteGallery(galleryId, this.props.currentUser.id))
  }

  removeFavorite(galleryId) {
    if (this.props.ownGallery) {
      return null;
    }
    this.setState({favoritedAmount: this.props.gallery.favorited_by.length - 1})
    this.props.dispatch(actions.removeFavoriteGallery(galleryId, this.props.currentUser.id))
  }

  vote(imageId) {
    this.props.dispatch(voteImage(imageId, this.props.currentUser.id))
  }

  toggleMoreInfo() {
    this.setState({ showMoreInfo: !this.state.showMoreInfo })
  }

  render() {
    if (!this.props.currentUser) {
      return <p>Loading gallery...</p>
    } else {
      // console.log('current user data:', this.props.currentUser)
      const {title, description, user, images, _id, id} = this.props.gallery
      // const favoriteIds = this.props.currentUser.favorites.map(gallery => gallery._id)
      const galleryId = id ? id : _id

      const favoriteStar = this.state.favorited
      ? <span className="favorite-star favorited" title="remove from favorites" onClick={()=>this.removeFavorite(galleryId)} ><i className="fa fa-star" aria-hidden="true"></i></span>
      : <span className="favorite-star" title="Add to favorites" onClick={()=>this.addFavorite(galleryId)} ><i className="fa fa-star-o" aria-hidden="true"></i></span>

      const favoritedInfo = <div className="favorited-info">{favoriteStar} {this.state.favoritedAmount}</div>

      const galleryUsername = <p className="gallery-user"><Link to={`/${user.username}`}>@{user.username}</Link></p>
      const displayUsername = this.props.profileGallery ? null : galleryUsername

      return (
        <div className="gallery">
            <div className="gallery-info">
              <div className="gallery-header">
                <h3 className="gallery-name">{title}</h3>
                {favoritedInfo}
              </div>
              {displayUsername}
              <MediaQuery minWidth={501}>
                <p className="gallery-description">{description}</p>
                {/* <Hashtags tags={tags} /> */}
              </MediaQuery>
              <MediaQuery maxWidth={500}>
                <div className="gallery-more-info">
                  <div className="gallery-description more-info-toggle" onClick={()=>this.toggleMoreInfo()}>...</div>
                  {this.state.showMoreInfo ? <p className="gallery-description">{description}</p> : null}
                </div>
              </MediaQuery>
            </div>
          <div className="gallery-images">
            <ImageViewer image={this.state.currentImage} vote={this.vote} userVotes={this.props.currentUser.upvoted} />
            <GalleryCollection images={images} viewImage={this.viewImage} userVotes={this.props.currentUser.upvoted} currentImage={this.state.currentImage}/>
          </div>
        </div>
      )
    }
  }
}

export default connect()(Gallery)
