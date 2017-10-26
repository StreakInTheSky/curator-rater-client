import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CurateInstagram from './instagram'
import CurateUrl from './url'
import CurateUpload from './upload'
import * as actions from '../../actions/curate'

export class CurateFetch extends React.Component {
  constructor(props){
    super(props)

    this.fetchImages = this.fetchImages.bind(this)
  }

  fetchImages(imageUrl) {
    this.props.dispatch(actions.fetchImage(imageUrl));
  }


  render() {
    return(
      <div className="curate-contents curate-fetch transition-item">
        <section className="curate-form-group">
          <div className="page-description">
            <p>Search Instagram by username/hashtag, upload, or enter the url of the images you want to add to the gallery.</p>
          </div>
          <CurateInstagram keyHandler={this.keyHandler} fetchImages={this.fetchImages} dispatch={this.props.dispatch}/>
          <CurateUrl keyHandler={this.keyHandler} fetchImages={this.fetchImages} dispatch={this.props.dispatch} />
          <CurateUpload dispatch={this.props.dispatch} />
        </section>
        <nav className="curate-page-nav">
          <Link className={this.props.addedImagesLength ? 'mock-button' : 'mock-button-disabled' } to={'/curate/details'} >Gallery Details &#62;</Link>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  addedImagesLength: state.curate.addedImages.length
});

export default connect(mapStateToProps)(CurateFetch);
