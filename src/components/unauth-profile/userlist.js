import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import UserListing from './user-listing'

export class UserList extends React.Component {
  back() {
    this.props.history.goBack()
  }

  render() {
    if(this.props.history.action !== 'PUSH') {
      return <Redirect to={`/${this.props.match.params.username}`} />
    }
    const renderUsers = () => {
      return this.props[this.props.match.params.userlist].map((user, index) => {
        return <UserListing
                 username={user.username}
                 key={index}
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
  following: state.profile.following
})

export default connect(mapStateToProps)(UserList)
