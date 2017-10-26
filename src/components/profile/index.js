import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route } from 'react-router-dom'

import * as actions from '../../actions/profile'
import ProfileMenu from './profile-menu'
import Gallery from '../gallery'
import UserList from './userlist'

export class UserProfile extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount() {
    this.props.actions.fetchUserInfo(this.props.match.params.username);
 }

  render() {
    const user = this.props.profile;
    // console.log(user)

    const galleries = user.galleries.map((gallery, index) => {
      return <Gallery key={index} gallery={gallery} />;
    });

    return (
      <main className="content">
        <Route path="/:username/:userlist" component={UserList} />
        <section className="profile-header">
          <div className="user-info">
            <h2 className="username">{user.username}</h2>
            <span className="mock-button follow-button" >Follow</span>
          </div>
          <ProfileMenu username={user.username} following={user.following} followers={user.followers} />
        </section>
        {galleries}
      </main>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

function mapStateToProps(state, props) {
  return { profile: state.profile }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
