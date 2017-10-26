import React from 'react'
import {connect} from 'react-redux'

import UserListing from './user-listing'

export class UserList extends React.Component {
  constructor(props) {
    super(props)

    this.renderUsers = this.renderUsers.bind(this)
    this.followUser = this.followUser.bind(this)
    this.back = this.back.bind(this)
  }

  followUser(userId) {
    console.log(`followed ${userId}`)
  }

  back(event) {
    console.log(event.target)
    console.log(this.box.childNodes)
    if (!(event.target === this.box.childNodes)) {
      this.props.history.goBack()
    }
  }

  renderUsers() {
    console.log(this.props.history)
    return this.props[this.props.match.params.userlist].map(user => {
      return <UserListing username={user.username} key={user.id} followUser={this.followUser}/>
    })
  }

  render() {
    return (
      <div className="modal-container" style={styles.container}>
        <div className="screen-overlay" style={styles.overlay} onClick={this.back}/>
        <div className="modal-box" style={styles.box} ref={box => {
          this.box = box
        }}>
          <div style={styles.header}>
            <h4>{this.props.match.params.userlist}</h4>
          </div>
          <div style={styles.content}>
            <ul style={styles.ul}>{this.renderUsers()}</ul>
          </div>
          <div style={styles.closeButton} className="close-button" onClick={this.back}>close</div>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  box: {
    position: 'relative',
    width: '500px',
    height: '500px',
    backgroundColor: 'white'
  },
  closeButton: {
    position: 'absolute',
    top: '-2em',
    right: 0,
    padding: '3px',
    backgroundColor: "white",
    cursor: 'pointer'
  },
  header: {
    padding: '10px'
  },
  content: {
    padding: '10px'
  },
  ul: {
    listStyle: 'none',
    padding: 0
  }
}

const mapStateToProps = (state, props) => {
  return {followers: state.user.followers, following: state.user.following}
}

export default connect(mapStateToProps)(UserList)
