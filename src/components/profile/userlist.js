import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import UserListing from './user-listing'
import * as actions from '../../actions/profile'

import './userlist.css'

export class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      followed: false
    }
  }

  back() {
    this.props.history.goBack()
  }

  follow(userId) {
    this.setState({ followed: true })
    this.props.dispatch(actions.followUser(userId, this.props.user.id))
      .then(()=>this.props.dispatch(actions.fetchUserInfo(this.props.match.params.username)))
  }

  unfollow(userId) {
    this.setState({ followed: false })
    this.props.dispatch(actions.unfollowUser(userId, this.props.user.id))
  }

  render() {
    if(this.props.history.action !== 'PUSH') {
      return <Redirect to={`/${this.props.match.params.username}`} />
    }
    const renderUsers = () => {
      const following = this.props.user.following.map(user => user._id)
      return this.props[this.props.match.params.userlist].map((user, index) => {
        return <UserListing
                 username={user.username}
                 userId={user._id}
                 key={index}
                 followed={this.state.followed}
                 following={following}
                 follow={(userId)=>this.follow(userId)}
                 unfollow={(userId)=>this.unfollow(userId)}
                 currentUserId={this.props.user.id}
               />
      })
    }

    return (
      <div className="modal">
        <div className="modal-background" onClick={()=>this.back()}/>
        <div className="modal-box" ref={box => { this.box = box }}>
          <div className="list-title">
            <h4>{this.props.match.params.userlist}</h4>
          </div>
          <div className="list-content">
            <ul className="user-list">{renderUsers()}</ul>
          </div>
          <div className="modal-close" onClick={()=>this.back()}>close</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  followers: state.profile.followers,
  following: state.profile.following,
  user: state.auth.currentUser
})

export default connect(mapStateToProps)(UserList)
