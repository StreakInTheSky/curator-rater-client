import React from 'react'

export default class ImageViewer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showHeart: false
    }
  }

  showHeart() {
    this.setState({showHeart: true})
  }

  hideHeart() {
    this.setState({showHeart: false})
  }

  render() {
    const isUpvoted = this.props.userVotes.indexOf(this.props.image._id) !== -1;
    const handleVotes = () => {
      if (isUpvoted) {
        alert('already voted')
        return null;
      }
      this.props.vote(this.props.image._id)
    }

    const heart = isUpvoted
    ? <div className="heart-container upvoted"
      onMouseEnter={()=>this.showHeart()}
      onMouseLeave={()=>this.hideHeart()}>
        <span className="heart"><i className="fa fa-heart" aria-hidden="true"></i></span>
      </div>
    : <div className="heart-container"
      onMouseEnter={()=>this.showHeart()}
      onMouseLeave={()=>this.hideHeart()} >
        <span className="heart" onClick={()=>handleVotes()}><i className="fa fa-heart-o" aria-hidden="true"></i></span>
      </div>

    return (
      <div className="gallery-image-viewer">
        <div className="viewed-image-container">
          <img className="viewed-image"
            src={this.props.image.path}
            alt="" onDoubleClick={()=>handleVotes()}
            onMouseEnter={()=>this.showHeart()}
            onMouseLeave={()=>this.hideHeart()}
          />
          {this.state.showHeart ? heart : null }
        </div>
      </div>
    )
  }
}
