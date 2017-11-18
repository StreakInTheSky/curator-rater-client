import React from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'

import * as actions from '../../actions/profile'
import ProfileMenu from './profile-menu'
import Gallery from '../gallery'
import UserList from './userlist'
import FollowButton from './follow-button'
import UserFavorites from './favorites'

import './profile.css'

export class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: false
    };
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchUserInfo(this.props.match.params.username));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname){
      this.setState({ favorites: false })
      this.props.dispatch(actions.fetchUserInfo(nextProps.match.params.username));
    }
  }

  followUser(userId) {
    this.props.dispatch(actions.followUser(userId, this.props.user.id))
  }

  unfollowUser(userId) {
    this.props.dispatch(actions.unfollowUser(userId, this.props.user.id))
  }

  toggleFavorites(e) {
    e.preventDefault()
    this.setState({ favorites: !this.state.favorites })
  }

  render() {
    if (!this.props.user || !this.props.profile) {
      return 'Loading page...'
    } else {
      const profile = this.props.profile;

      const galleries = profile.galleries.map((gallery, index) => {
        return <Gallery
          key={index}
          gallery={gallery}
          ownGallery={profile.id === this.props.user.id ? true : null}
          profileGallery={profile.username === gallery.user.username ? true : null}
          currentUser={this.props.user}
        />;
      });

      const addGalleryButton = <Link className="mock-button big-button" to="/curate">&#65291;New Gallery</Link>

      const followingIds = this.props.user.following.map(user => {
          if (user._id) {
            return user._id
          }
          return user
        })
      const profileLink = <span><a className="link-back-to-profile" onClick={(e)=>this.toggleFavorites(e)} >{profile.username}</a>'s favorites</span>

      const chooseAddButton = profile.id === this.props.user.id
        ? addGalleryButton
        : <FollowButton
          following={followingIds.indexOf(profile.id) !== -1 }
          userId={profile.id}
          follow={userId => this.followUser(userId)}
          unfollow={userId => this.unfollowUser(userId)}/>

      return (
        <main className="content">
          <Route exact path="/:username/list/:userlist" component={UserList} follow={this.followUser} unfollow={this.unfollowUser} />
          <section className="profile-header">
            <div className="user-info">
              <h2 className="username">
                {this.state.favorites
                  ? profileLink
                  : profile.id === this.props.user.id ? profile.username + ' (me)' : profile.username
                }
              </h2>
              {this.state.favorites ? null : chooseAddButton}
            </div>
            <ProfileMenu
              username={profile.username}
              following={profile.following}
              followers={profile.followers}
              toggleFavorites={(e)=>this.toggleFavorites(e)}
            />
          </section>
          {this.state.favorites ? <UserFavorites /> : galleries}
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
