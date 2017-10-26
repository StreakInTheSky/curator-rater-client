import React from 'react'

import * as actions from '../../actions/curate'

export default function CurateUpload(props) {

  const uploadImages = event => {
    const files = event.target.files
    for (let i = 0; i < files.length; i++) {
      props.dispatch(actions.readFile(files[i]))
    }
  }

  return (
    <form id="uploadImage" className="curate-forms">
      <label htmlFor="upload" className="mock-button" ><span>Upload</span></label>
      <input id="upload" style={styles.upload} type="file" onChange={uploadImages} accept="image/*" multiple />
    </form>
    )
}

const styles = {
  upload: {
    display: 'none'
  }
}
