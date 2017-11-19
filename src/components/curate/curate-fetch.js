import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import CurateInstagram from './instagram'
import CurateUrl from './url'
import CurateUpload from './upload'
import * as actions from '../../actions/curate'

export class CurateFetch extends React.Component {
  // constructor(props){
  //   super(props)
  //
  //   this.fetchImages = this.fetchImages.bind(this)
  // }

  fetchImages(imageUrl) {
    this.props.dispatch(actions.fetchImage(imageUrl));
  }


  render() {
    const nav = <nav className="curate-page-nav">
                  <span className={this.props.addedImagesLength ? 'mock-button' : 'mock-button-disabled' }
                        onClick={()=>this.props.togglePage('details')}>
                    Gallery Details &#62;
                  </span>
                </nav>

    return(
      <div className="curate-contents curate-fetch">
        {nav}
        <section className="curate-fetch-choices">
          {/* <CurateInstagram keyHandler={this.keyHandler} fetchImages={this.fetchImages} dispatch={this.props.dispatch}/> */}
          <CurateUrl keyHandler={this.keyHandler} fetchImages={this.fetchImages} dispatch={this.props.dispatch} />
          <CurateUpload dispatch={this.props.dispatch} />
        </section>
        {nav}
      </div>
    )
  }
}

export default connect()(CurateFetch);
