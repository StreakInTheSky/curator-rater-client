import React from 'react';
import { connect } from 'react-redux';

// import CurateInstagram from './instagram'
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
    const nav = <nav className="curate-page-nav">
                  <span className={this.props.addedImagesLength ? 'mock-button next' : 'mock-button-disabled next' }
                        onClick={()=>this.props.togglePage('details')}>
                    Gallery Details <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </span>
                </nav>

    return(
      <div className="curate-contents curate-fetch">
        <section className="curate-fetch-choices">
          {/* <CurateInstagram keyHandler={this.keyHandler} fetchImages={this.fetchImages} dispatch={this.props.dispatch}/> */}
          <CurateUrl keyHandler={this.keyHandler} fetchImages={(url)=>this.fetchImages(url)} dispatch={this.props.dispatch} />
          <CurateUpload dispatch={this.props.dispatch} />
        </section>
        {nav}
      </div>
    )
  }
}

export default connect()(CurateFetch);
