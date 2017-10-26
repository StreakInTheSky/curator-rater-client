import React from 'react'

export default class CurateUrl extends React.Component {
  constructor(props) {
    super(props)

    this.fetchImageInput = null

    this.fetchImageFromUrl = this.fetchImageFromUrl.bind(this)
  }

  fetchImageFromUrl(event) {
    event.preventDefault()
    // regex for valid url here
    this.props.fetchImages(this.fetchImageInput.value)
  }

  render() {
    return (
      <form id="fetchImageFromUrl" className="curate-forms" onSubmit={this.fetchImageFromUrl}>
        <label>Image Url</label>
        <input type="url" ref={(input) => { this.fetchImageInput = input; }} required/>
        <button type="submit">Fetch Image</button>
      </form>
    )
  }
}
