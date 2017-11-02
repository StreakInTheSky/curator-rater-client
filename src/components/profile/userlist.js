import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import UserListing from './user-listing'

import './userlist.css'

export class UserList extends React.Component {


  followUser(userId) {
    console.log(`followed ${userId}`)
  }

  back() {
    this.props.history.goBack()
  }

  render() {
    console.log(this.props)
    const renderUsers = () => {
      return this.props[this.props.match.params.userlist].map(user => {
        return <UserListing username={user.username} key={user.id} followUser={this.followUser}/>
      })
    }

    return (
      <div className="modal">
        <div className="modal-background" onClick={this.back}/>
        <div className="modal-box" ref={box => {
          this.box = box
        }}>
          <div className="list-title">
            <h4>{this.props.match.params.userlist}</h4>
          </div>
          <div className="list-content">
            <ul className="user-list">{renderUsers()}</ul>
          </div>
          <div className="close-button" onClick={this.back}>close</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {followers: state.profile.followers, following: state.profile.following}
}

export default withRouter(connect(mapStateToProps)(UserList))
