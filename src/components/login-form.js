import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {Link} from 'react-router-dom'
import {loginUser} from '../actions/auth';
import Input from './input';
import {required} from '../validators';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(loginUser(values));
    }

    render() {
        return (
          <div className="login-container">
            <form
              className="login-form"
              onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
              )}>
              <label htmlFor="email">email</label>
              <Field component={Input}
                type="email"
                name="email"
                validate={[required]}
              />
              <label htmlFor="password">Password</label>
              <Field
                component={Input}
                type="password"
                name="password"
                validate={[required]}
              />
              <button
                type="submit"
                disabled={this.props.pristine || this.props.submitting}>
                Login
              </button>
            </form>
            <div>
              <p>
                or <Link to={'/signup'}>Sign Up</Link>
              </p>
            </div>
          </div>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('login', Object.keys(errors)[0]))
})(LoginForm);
