import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
// import PageTransition from 'react-router-page-transition';

import ImageGallery from './image-gallery'
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

    // this.deleteImage = this.deleteImage.bind(this)
    // this.viewImage = this.viewImage.bind(this)
    // this.unviewImage = this.unviewImage.bind(this)
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
    console.log(this.state.page)
    const mainContent = this.state.page === 'fetch'
      ? <CurateFetch addedImagesLength={this.props.addedImages.length} togglePage={(page)=>this.togglePage(page)}/>
      : <CurateDetails togglePage={(page)=>this.togglePage(page)}/>

    const galleryPreview = <ImageGallery
                             images={this.props.addedImages}
                             deleteImage={this.deleteImage}
                             viewImage={this.viewImage}
                             unviewImage={this.unviewImage}
                             currentImage={this.props.currentImage}
                           />
    return (
      <div className="page-content">
        {/* <Route exact path="/curate" render={() => <Redirect to="/curate/fetch" component={CurateFetch} />} /> */}
        <header className="page-header">
          <h2 className="page-title">Curate</h2>
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
