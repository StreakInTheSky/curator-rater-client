import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import PageTransition from 'react-router-page-transition';

import GalleryPreview from './preview'
import CurateFetch from './curate-fetch'
import CurateDetails from './curate-details'
import * as actions from '../../actions/curate'

import './curate.css';

export class CurateContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: true,
      page: 'fetch'
    }

    this.deleteImage = this.deleteImage.bind(this)
    this.viewImage = this.viewImage.bind(this)
    this.unviewImage = this.unviewImage.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.user) {
      this.setState({ loggedIn: false })
    }
  }

  togglePage(page) {
    this.setState({page: page})
  }

  deleteImage(imageIndex) {
    this.props.dispatch(actions.deleteImage(imageIndex));
  }

  viewImage(imageIndex) {
    this.props.dispatch(actions.viewImage(imageIndex));
  }

  unviewImage(imageIndex) {
    this.props.dispatch(actions.unviewImage(imageIndex));
  }
  render() {
    if (!this.state.loggedIn) {
      return <Redirect to="/" />
    }
    const mainContent = this.state.page === 'fetch'
      ? <CurateFetch addedImagesLength={this.props.addedImages.length} togglePage={(page)=>this.togglePage(page)}/>
      : <CurateDetails togglePage={(page)=>this.togglePage(page)}/>

    const fetchDescription = 'Fetch your images by url or  by uploading from your device.'
    const detailsDescription = 'Add a title and a description to your gallery.'

    const galleryPreview = <GalleryPreview
                             images={this.props.addedImages}
                             deleteImage={this.deleteImage}
                             viewImage={this.viewImage}
                             unviewImage={this.unviewImage}
                             currentImage={this.props.currentImage}
                           />
    return (
      <div className="page-content">
        <header className="page-header">
          <h2 className="page-title">Curate</h2>
          <p className="page-description">{this.state.page === 'fetch' ? fetchDescription : detailsDescription }</p>
        </header>
        <main className="main-content">
          {mainContent}
          {this.props.addedImages.length > 0 ? galleryPreview : null}
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  addedImages: state.curate.addedImages,
  currentImage: state.curate.currentImage,
  user: state.auth.currentUser
});

export default connect(mapStateToProps)(CurateContainer);
