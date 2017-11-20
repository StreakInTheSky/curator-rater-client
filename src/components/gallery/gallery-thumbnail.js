import React from 'react'

export default class Thumbnail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      upvotes: 0
    }
  }

  componentWillMount() {
    this.setState({upvotes: this.props.upvotes.length})
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.isUpvoted && nextProps.isUpvoted) {
      this.setState({upvotes: this.state.upvotes + 1})
    }
    if(this.props.isUpvoted && !nextProps.isUpvoted) {
      this.setState({upvotes: this.state.upvotes - 1})
    }
  }

  render() {
    const toggleSelectImage = () => {
      this.props.viewImage(this.props.index)
    }

    const heartAmount = <span className="upvotes">{this.state.upvotes}</span>
    const heart = this.props.isUpvoted
    ? <span className="heart upvoted"><i className="fa fa-heart" aria-hidden="true"></i></span>
    : <span className="heart"><i className="fa fa-heart-o" aria-hidden="true"></i></span>

    const hearts = <div className="hearts">{heart} {heartAmount}</div>

    return (
      <div className={this.props.currentImage ? "thumbnail-container selected" : "thumbnail-container"} onClick={toggleSelectImage}>
        {hearts}
        <img className="thumbnail" src={this.props.src} alt="" />
      </div>
    )
  }
  }
