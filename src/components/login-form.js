import React from 'react';
import {Field, reduxForm} from 'redux-form';

import {loginUser} from '../actions/auth';
import Input from './input';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(loginUser(values));
    }

    render() {
        const errorMessage = this.props.error ? <p className="error-message">{this.props.error}</p> : null

        return (
          <div className="login-container">
            {errorMessage}
            <form
              className="login-form"
              onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
              )}>
              <label htmlFor="email">email</label>
              <Field component={Input}
                type="text"
                name="email"
              />
              <label htmlFor="password">Password</label>
              <Field
                component={Input}
                type="password"
                name="password"
              />
              <button
                type="submit"
                disabled={this.props.submitting}>
                Login
              </button>
            </form>
          </div>
        );
    }
}

export default reduxForm({
  form: 'login',
  initialValues: {
    email: 'demo@email.com',
    password: 'password'
  }
})(LoginForm);
