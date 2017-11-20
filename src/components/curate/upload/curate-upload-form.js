import React from 'react'

export default function CurateUploadForm(props) {
  return (
    <form id="uploadImage" className="curate-fetch-form">
      <div className="curate-form-field">
        <label htmlFor="upload" className="curate-form-label mock-button upload-button" >Upload</label>
        <input id="upload" className="curate-form-input hidden" type="file" onChange={(event)=>props.uploadImages(event)} accept="image/*" multiple />
      </div>
    </form>
    )
}
