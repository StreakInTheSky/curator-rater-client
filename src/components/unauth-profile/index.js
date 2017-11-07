import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import * as actions from '../../actions/profile'
import ProfileMenu from './profile-menu'
import Gallery from '../unauth-gallery'
import UserList from './userlist'
import UserFavorites from './favorites'

export class UnauthProfile extends React.Component {
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

  toggleFavorites(e) {
    e.preventDefault()
    this.setState({ favorites: !this.state.favorites })
  }

  render() {
    const profile = this.props.profile;

    const galleries = profile.galleries.map((gallery, index) => {
      return <Gallery
        key={index}
        gallery={gallery}
        profileGallery={profile.username === gallery.user.username ? true : null}
      />;
    });

    const profileLink = <span><a onClick={(e)=>this.toggleFavorites(e)} >{profile.username}</a>'s favorites</span>

    return (
      <main className="content">
        <Route exact path="/:username/list/:userlist" component={UserList} />
        <section className="profile-header">
          <div className="user-info">
            <h2 className="username">
              {this.state.favorites
                ? profileLink
                : profile.username
              }
            </h2>
          </div>
          <ProfileMenu
            username={profile.username}
            following={profile.following}
            followers={profile.followers}
            toggleFavorites={(e)=>this.toggleFavorites(e)}
          />
        </section>
        {this.state.favorites ? <UserFavorites favorites={profile.favorites} /> : galleries}
      </main>
    )
  }
}

const mapStateToProps = (state, props) => ({
  profile: state.profile
});

export default withRouter(connect(mapStateToProps)(UnauthProfile))
