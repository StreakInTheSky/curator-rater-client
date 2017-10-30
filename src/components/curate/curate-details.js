import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {Field, reduxForm, focus} from 'redux-form';
import Input from '../input';
import TextArea from '../text-area';
import {required, nonEmpty, isTrimmed} from '../../validators';
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
  }

  render() {
    return(
      <div className="curate-contents curate-details transition-item">
        <section className="curate-form-group">
          <div className="page-description">
            <p>Add a title and description to your gallery.</p>
          </div>
          <form
            id="gallery-details"
            className="curate-forms"
            onSubmit={this.props.handleSubmit(values =>
              this.onSubmit(values)
          )}>
            <div className="form-section">
              <label htmlFor="title">Title*</label>
              <Field
                component={Input}
                type="text"
                name="title"
                validate={[required, nonEmpty, isTrimmed]}
              />
            </div>
            <div className="form-section">
              <label htmlFor="description">Description</label>
              <Field
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
        </section>
        <nav className="curate-page-nav">
          <Link className="mock-button next-page" to={'/curate/fetch'} >&#60; Back</Link>
          <button
            type="submit"
            form="gallery-details"
            disabled={((this.props.images.length > 0) && this.props.pristine) || this.props.submitting}
          >Post Gallery</button>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  images: state.curate.addedImages,
  user: state.auth.currentUser
});

CurateDetails = connect(mapStateToProps)(CurateDetails);

export default reduxForm({
  form: 'curate',
  onSubmitFail: (errors, dispatch) => dispatch(focus('curate', Object.keys(errors)[0]))
})(CurateDetails);
