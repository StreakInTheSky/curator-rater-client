import React from 'react'

import CurateUrlForm from './curate-url-form'

export default class CurateUrl extends React.Component {
  constructor(props) {
    super(props)
    this.fetchImageFromUrl = this.fetchImageFromUrl.bind(this)
  }

  fetchImageFromUrl(event, url) {
    event.preventDefault()
    // regex for valid url here
    this.props.fetchImages(url)
  }

  render() {
    return (
      <div className="curate-choice">
        <p className="curate-choice-description">Fetch image from url.</p>
          <CurateUrlForm fetchImageFromUrl={this.fetchImageFromUrl} fetchImageInput={this.fetchImageInput}/>
      </div>
    )
  }
}
