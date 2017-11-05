import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import * as actions from '../../actions/profile'
import ProfileMenu from './profile-menu'
import Gallery from '../gallery'
import UserList from './userlist'
import FollowButton from './follow-button'

import './profile.css'

export class UserProfile extends React.Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchUserInfo(this.props.match.params.username));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname){
      this.props.dispatch(actions.fetchUserInfo(nextProps.match.params.username));
    }
  }

  followUser(userId) {
    this.props.dispatch(actions.followUser(userId, this.props.user.id))
      .then(()=>console.log('followed:', this.props.profile.username))
      .then(()=>this.props.dispatch(actions.fetchUserInfo(this.props.profile.username)))
  }

  unfollowUser(userId) {
    this.props.dispatch(actions.unfollowUser(userId, this.props.user.id))
      .then(()=>console.log('unfollowed:', this.props.profile.username))
      .then(()=>this.props.dispatch(actions.fetchUserInfo(this.props.profile.username)))
  }

  render() {
    if (!this.props.user) {
      return <div>Loading page...</div>
    } else {
      const profile = this.props.profile;

      const galleries = profile.galleries.map((gallery, index) => {
        return <Gallery key={index} gallery={gallery} ownProfile={profile.id === this.props.user.id ? true : null} />;
      });

      const followingIds = this.props.user.following.map(user => user._id)

      return (
        <main className="content">
          <Route path="/:username/:userlist" component={UserList} follow={this.followUser} unfollow={this.unfollowUser} />
          <section className="profile-header">
            <div className="user-info">
              <h2 className="username">
                {profile.id === this.props.user.id ? 'My Profile' : profile.username}
              </h2>
              {profile.id === this.props.user.id ? null : <FollowButton
                                                            following={followingIds.indexOf(profile.id) >= 0}
                                                            userId={profile.id}
                                                            follow={userId => this.followUser(userId)}
                                                            unfollow={userId => this.unfollowUser(userId)}/>}
            </div>
            <ProfileMenu
              username={profile.username}
              following={profile.following}
              followers={profile.followers}
            />
          </section>
          {galleries}
        </main>
      )
    }
  }
}

const mapStateToProps = (state, props) => ({
  profile: state.profile,
  user: state.auth.currentUser
});

export default connect(mapStateToProps)(UserProfile)
