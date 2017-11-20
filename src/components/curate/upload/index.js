import React from 'react'
import {connect} from 'react-redux'

import CurateUploadForm from './curate-upload-form'
import * as actions from '../../../actions/curate'

export class CurateUpload extends React.Component {
  constructor(props) {
    super(props)
    this.uploadImages = this.uploadImages.bind(this)
  }

  uploadImages(event) {
    const files = event.target.files
    for (let i = 0; i < files.length; i++) {
      this.props.dispatch(actions.readFile(files[i]))
    }
  }

  render() {
    return (
      <div className="curate-choice">
        <p className="curate-choice-description">Upload files from you device.</p>
          <CurateUploadForm uploadImages={this.uploadImages} />
      </div>
    )
  }
}

export default connect()(CurateUpload)
