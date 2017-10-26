import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { WithContext as ReactTags } from 'react-tag-input';

import * as actions from '../../actions/curate'

export class CurateDetails extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      isValid: false
    }

    this.galleryTitle = null;
    this.galleryDescription = null;

    this.addTitle = this.addTitle.bind(this);
    this.addDescription = this.addDescription.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
    // this.handleAddition = this.handleAddition.bind(this);
    this.submitGallery = this.submitGallery.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const {title, description} = nextProps.details

    if (title && description) {
      this.setState({ isValid: true })
    } else {
      this.setState({ isValid: false})
    }
  }

  addTitle() {
    this.props.dispatch(actions.addTitle(this.galleryTitle.value))
  }

  addDescription() {
    this.props.dispatch(actions.addDescription(this.galleryDescription.value))
  }

  // handleDelete(i) {
  //   this.props.dispatch(actions.removeTag(i))
  // }
  //
  // handleAddition(tag) {
  //   this.props.dispatch(actions.addTag(this.props.details.tags.length + 1, tag))
  // }

  submitGallery() {
    this.props.dispatch(actions.submitGallery(this.props.details))
  }



  render() {
    return(
      <div className="curate-contents curate-details transition-item">
        <section className="curate-form-group">
          <div className="page-description">
            <p>Add a title and description to your gallery. Add tags so people can easily find your gallery.</p>
          </div>
          <form id="galleryDetails" className="curate-forms">
            <label>Title*</label>
            <input type="text" ref={(input) => { this.galleryTitle = input; }} onChange={this.addTitle} />
            <label>Description*</label>
            <textarea ref={(input) => { this.galleryDescription = input; }} onChange={this.addDescription} />
            {/* <label>Tags</label>
            <ReactTags
              tags={this.props.details.tags}
              placeholder={null}
              handleDelete={this.handleDelete}
              handleAddition={this.handleAddition}
              allowDeleteFromEmptyInput={false} /> */}
          </form>
        </section>
        <nav className="curate-page-nav">
          <Link className="mock-button next-page" to={'/curate/fetch'} >&#60; Back</Link>
          <button onClick={this.submitGallery} disabled={!this.state.isValid} >Post Gallery</button>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  details: state.curate
});

export default connect(mapStateToProps)(CurateDetails);
