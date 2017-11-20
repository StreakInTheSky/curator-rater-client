import React from 'react'

export default class CurateUrlForm extends React.Component {
  constructor(props) {
    super(props)
    this.fetchImageInput = null
  }

  render() {
    return (
      <form id="fetchImageFromUrl" className="curate-form" onSubmit={(event)=>this.props.fetchImageFromUrl(event, this.fetchImageInput.value)} >
        {/* TODO* Allow option for multiple urls */}
        <div className="curate-form-field">
          <label className="curate-form-label">Image Url</label>
          <input className="curate-form-input" type="url" ref={(input) => { this.fetchImageInput = input; }} required/>
        </div>
        <button className="curate-fetch-submit" type="submit">Fetch Image</button>
      </form>
    )
  }
}
