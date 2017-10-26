import React from 'react';

import ImageViewer from './gallery-viewer'
import GalleryCollection from './gallery-collection';

export default class Gallery extends React.Component {
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
    console.log(this.props.gallery)
    const {title, description, username, images, tags} = this.props.gallery

    return (
      <div className="gallery">
        <div className="gallery-info">
          <h3 className="gallery-name">{title}</h3>
          <span className="favorite-star">&#9734;</span>
          <p className="gallery-description">{description}</p>
          {/* <Hashtags tags={tags} /> */}
        </div>
        <ImageViewer image={this.state.currentImage}/>
        <GalleryCollection images={images} viewImage={this.viewImage}/>
      </div>
    )
  }
}
