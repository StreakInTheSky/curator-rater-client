import React from 'react'
import Transition from 'react-transition-group/Transition'

import InstagramImages from './view-instagram-images'
import * as actions from '../../actions/curate'

export default class CurateInstagram extends React.Component {
  constructor(props) {
    super(props)

    this.fetchInstagramInput = null
    this.fetchingMessage = null
    this.state = {
      fetchedFromInstagram: [],
      fetchInstagramBy: 'Username',
      isFetchingImages: false,
      showInstagramDropdown: false,
      imagesToAdd: []
    }

    this.defaultState = this.state

    this.changeFetchingMessage = this.changeFetchingMessage.bind(this)
    this.switchFetchInstagramBy = this.switchFetchInstagramBy.bind(this)
    this.fetchImagesFromInstagram = this.fetchImagesFromInstagram.bind(this)
    this.toggleChosen = this.toggleChosen.bind(this)
    this.addImages = this.addImages.bind(this)
    this.openDropdown = this.openDropdown.bind(this)
    this.renderMessages = this.renderMessages.bind(this)
    this.renderGallery = this.renderGallery.bind(this)
    this.closeGallery = this.closeGallery.bind(this)
  }

  switchFetchInstagramBy() {
    if (this.state.fetchInstagramBy === 'Username') {
      this.setState({ fetchInstagramBy: 'Hashtag '})
    } else {
      this.setState({ fetchInstagramBy: 'Username'})
    }
  }

  changeFetchingMessage() {
    if (this.state.isFetchingImages) {
      this.fetchingMessage = "...loading images"
    } else {
      this.fetchingMessage = null
    }
  }

  fetchImagesFromInstagram(event) {
    event.preventDefault()

    this.setState({ fetchedFromInstagram: [], isFetchingImages: true })

    let url = 'http://localhost:3000/api/fetch/instagram';

    if (this.state.fetchInstagramBy === 'Username') {
      url = url + `?username=${this.fetchInstagramInput.value}`
    } else if (this.state.fetchInstagramBy === 'Hashtag') {
      url = url + `?tag=${this.fetchInstagramInput.value}`
    }

    const xhr = new XMLHttpRequest();
    xhr.onloadend = () => {
      this.setState({
        fetchedFromInstagram: xhr.response,
        isFetchingImages: false,
        showInstagramDropdown: true,
      })
    };
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
  }

  toggleChosen(imgSrc) {
    if (this.state.imagesToAdd.includes(imgSrc)) {
      const images = [...this.state.imagesToAdd]
      images.splice(images.indexOf(imgSrc), 1)
      this.setState({ imagesToAdd: images })
    } else {
      this.setState({ imagesToAdd: [...this.state.imagesToAdd, imgSrc]})
    }
  }

  addImages() {
    this.setState({ imagesToAdd: [], showInstagramDropdown: false })
    this.state.imagesToAdd.forEach(imageUrl => this.props.fetchImages(imageUrl))
  }

  openDropdown() {
    if (this.state.fetchedFromInstagram.length > 0) {
      this.setState({ showInstagramDropdown: true })
    }
  }

  renderMessages() {
    this.changeFetchingMessage()

    if (this.state.isFetchingImages) {
      return (
        <p style={styles.fetchingMessage}>{this.fetchingMessage}</p>
    )} else {
      return null
    }
  }

  renderGallery() {
    if (this.state.showInstagramDropdown) {
      return <InstagramImages
        urls={this.state.fetchedFromInstagram}
        toggleChosen={this.toggleChosen}
        chosenImageAmount={this.state.imagesToAdd.length}
        addImages={this.addImages}
        close={this.closeGallery}
        open={this.state.showInstagramDropdown}
      />
    }
    else {
      return null
    }
  }

  closeGallery() {
    this.setState({ showInstagramDropdown: false })
  }

  render() {
    const loadingMessage = this.renderMessages()
    const instagramGallery = this.renderGallery()

    return (
      <form id="fetchImageFromInstagram" className="curate-forms" onSubmit={this.fetchImagesFromInstagram}>
        <label>
          Enter Instagram <span
                            className="fetch-instagram-by"
                            style={styles.searchBy}
                            onClick={this.switchFetchInstagramBy}>
                            {this.state.fetchInstagramBy}
                          </span>
        </label>
        <div className="input-group" style={styles.inputGroup} onClick={this.openDropdown}>
          <input type="text" ref={(input) => { this.fetchInstagramInput = input; }} required/>
          {loadingMessage}
        </div>
        <button type="submit">View Images</button>


        <div className={this.state.showInstagramDropdown ? 'instagram-gallery-container open' : 'instagram-gallery-container' }
          style={styles.galleryContainer}>
          {instagramGallery}
          {/* <Transition
            in={this.state.showInstagramDropdown}
            transitionAppearTimeout={600}>
            {instagramGallery}
          </Transition> */}
        </div>
      </form>
    )
  }
}

const styles = {
  searchBy: {
    backgroundColor: 'black',
    color: 'white',
    textDecoration: 'underline'
  },
  inputGroup: {
    display: 'inline-block',
    position: 'relative'
  },
  fetchingMessage: {
    position: 'absolute',
    textAlign: 'right',
    top: '-0.75em',
    right: 7,
    color: 'gray'
  },
  galleryContainer: {
    overflowY: 'hidden'
  }
}
