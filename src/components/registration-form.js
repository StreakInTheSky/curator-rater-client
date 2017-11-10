import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {createUser} from '../actions/profile';
import {loginUser} from '../actions/auth';

import Input from './input';
import {required, nonEmpty, email, length, isTrimmed, noCaps} from '../validators';

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const {username, password, email} = values;
    const user = {username, password, email};
    return this.props
      .dispatch(createUser(user))
      .then(() => this.props.dispatch(loginUser({ email, password })))
  }

  render() {
    console.log(this.props)
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values)
        )}>
        <label className="login-form-label" htmlFor="username">Username</label>
        <Field
          component={Input}
          type="text"
          name="username"
          validate={[required, nonEmpty, length({min: 2, max: 18}), isTrimmed, noCaps]}
        />
        <label className="login-form-label" htmlFor="email">Email</label>
        <Field
          component={Input}
          type="email"
          name="email"
          validate={[required, nonEmpty, isTrimmed, email]}
        />
        <label className="login-form-label" htmlFor="password">Password</label>
        <Field
          component={Input}
          type="password"
          name="password"
          validate={[required, length({min: 8, max: 72}), isTrimmed]}
        />
        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          Sign Up
        </button>
      </form>
    );
    }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
