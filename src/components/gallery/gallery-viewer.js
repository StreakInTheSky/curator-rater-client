import React from 'react'
import MediaQuery from 'react-responsive'

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
        this.props.unvote(this.props.image._id)
      } else {
        this.props.vote(this.props.image._id)
      }
    }

    const heart = isUpvoted
    ? <div className="heart-container upvoted"
      onMouseEnter={()=>this.showHeart()}
      onMouseLeave={()=>this.hideHeart()}>
        <span className="heart" onClick={()=>this.props.unvote(this.props.image._id)}><i className="fa fa-heart" aria-hidden="true"></i></span>
      </div>
    : <div className="heart-container"
      onMouseEnter={()=>this.showHeart()}
      onMouseLeave={()=>this.hideHeart()} >
        <span className="heart" onClick={()=>this.props.vote(this.props.image._id)}><i className="fa fa-heart-o" aria-hidden="true"></i></span>
      </div>

    return (
      <div className="gallery-image-viewer">
        <div className="viewed-image-container">
          <MediaQuery minWidth={501}>
            <img className="viewed-image"
              src={this.props.image.path}
              alt=""
              onMouseEnter={()=>this.showHeart()}
              onMouseLeave={()=>this.hideHeart()}
            />
          </MediaQuery>
          <MediaQuery maxWidth={500}>
            <img className="viewed-image"
              src={this.props.image.path}
              alt=""
              onDoubleClick={()=>handleVotes()}
            />
          </MediaQuery>
          <MediaQuery minWidth={501}>
            {this.state.showHeart ? heart : null }
          </MediaQuery>
          <MediaQuery maxWidth={500}>
            {heart}
          </MediaQuery>
        </div>
      </div>
    )
  }
}
