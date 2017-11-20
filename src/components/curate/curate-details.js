import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {Field, reduxForm, focus} from 'redux-form';
import Input from '../input';
import TextArea from '../text-area';
import {required, nonEmpty, isTrimmed, length} from '../../validators';
// import { WithContext as ReactTags } from 'react-tag-input';

import * as actions from '../../actions/curate'

export class CurateDetails extends React.Component {
  // handleDelete(i) {
  //   this.props.dispatch(actions.removeTag(i))
  // }
  //
  // handleAddition(tag) {
  //   this.props.dispatch(actions.addTag(this.props.details.tags.length + 1, tag))
  // }

  onSubmit(values) {
    const { title, description } = values;
    const gallery = {
      title,
      description,
      images: this.props.images,
      user: this.props.user.id
    }
    return this.props.dispatch(actions.submitGallery(gallery))
      .then(()=>this.props.history.push(`/${this.props.user.username}`))
  }

  render() {
    return(
      <div className="curate-contents curate-details">
        <form
          id="gallery-details"
          className="curate-details-form"
          onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values)
        )}>
          <div className="curate-form-field curate-field-title">
            <label className="curate-form-label" htmlFor="title">Title*</label>
            <Field
              className="curate-form-input"
              component={Input}
              type="text"
              name="title"
              validate={[required, nonEmpty, length({min: 2, max: 34}), isTrimmed]}
            />
          </div>
          <div className="curate-form-field curate-field-description">
            <label className="curate-form-label" htmlFor="description">Description</label>
            <Field
              className="curate-form-text-area"
              component={TextArea}
              type="textarea"
              name="description"
            />
          </div>
          {/* <label>Tags</label>
          <ReactTags
            tags={this.props.details.tags}
            placeholder={null}
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            allowDeleteFromEmptyInput={false} /> */}
        </form>
        <nav className="curate-page-nav">
          <span className="mock-button next-page" onClick={()=>this.props.togglePage('fetch')} >
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
          </span>
          <button
            type="submit"
            form="gallery-details"
            disabled={(this.props.images.length === 0 || this.props.pristine) || this.props.submitting}
          >Post Gallery</button>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  images: state.curate.addedImages,
  // galleryCreated: state.curate.isSubmitted,
  user: state.auth.currentUser
});

CurateDetails = withRouter(connect(mapStateToProps)(CurateDetails));

export default reduxForm({
  form: 'curate',
  onSubmitFail: (errors, dispatch) => dispatch(focus('curate', Object.keys(errors)[0]))
})(CurateDetails);
