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
      currentImage: this.props.gallery.images[0],
      showMoreInfo: false,
      favoritedAmount: 0
    }

    this.viewImage = this.viewImage.bind(this)
  }

  componentDidMount() {
    this.setState({favoritedAmount: this.props.gallery.favorited_by.length})
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.gallery._id !== nextProps.gallery._id){
      this.setState({currentImage: nextProps.gallery.images[0]})
    }
  }

  viewImage(imgIndex) {
    this.setState({currentImage: this.props.gallery.images[imgIndex]})
  }

  toggleMoreInfo() {
    this.setState({ showMoreInfo: !this.state.showMoreInfo })
  }

  render() {
    const {title, description, user, images} = this.props.gallery

    const favoriteStar = <span className="favorite-star favorited"><i className="fa fa-star" aria-hidden="true"></i></span>

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
          <ImageViewer image={this.state.currentImage} />
          <GalleryCollection images={images} viewImage={this.viewImage} currentImage={this.state.currentImage}/>
        </div>
      </div>
    )
  }
}

export default connect()(Gallery)
