import React from 'react'

export default class ImageViewer extends React.Component {
  render() {
    return (
      <div className="gallery-image-viewer">
        <div className="viewed-image-container">
          <img className="viewed-image" src={this.props.image.path} alt="" />
        </div>
      </div>
    )
  }
}
