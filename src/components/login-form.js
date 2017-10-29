import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Control, Form } from 'react-redux-form'

import * as actions from '../actions/auth';

export class LoginForm extends React.Component {
  login(info) {
    this.props.dispatch(actions.loginUser(info))
  }

  render() {
    return (
      <div className="login">
        <Form model="forms.login" className="login-form" onSubmit={info => this.login(info)}>
          <label htmlFor="login-email">email:</label>
          <Control.text model="forms.login.email" id="login-email" />
          <label htmlFor="login-password">password:</label>
          <Control type="password" model="forms.login.password" id="login-password" />
          <button type="submit">login</button>
        </Form>
        <div>
          <p>
            or <Link to={'/signup'}>Sign Up</Link>
          </p>
        </div>
      </div>
    )
  }
}

export default connect()(LoginForm);
