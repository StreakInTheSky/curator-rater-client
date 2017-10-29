import React from 'react';
import { connect } from 'react-redux';
import { Control, Form, Errors } from 'react-redux-form';

import * as actions from '../actions/profile';
// import { loginUser } from '../actions/auth';

export class RegistrationForm extends React.Component {
  // constructor(props) {
  //   super(props)
  //
  //   this.checkPasswordsMatch = this.checkPasswordsMatch.bind(this)
  // }

  // checkPasswordsMatch(val) {
  //   return this.state.password === this.state.passwordConfirm
  // }


  registerUser(values){
    this.props
      .dispatch(actions.createUser(values))
      // .then(() => this.props.dispatch(loginUser({
      //   email: values.email,
      //   password: values.password
      // })))
  }

  render() {
    const errorStyles = {
      position: "relative",
      zIndex: 10,
      margin: 0,
      padding: 0,
      backgroundColor: "white",
      color: "red",
      fontSize: ".75em"
    }

    return (
      <Form model="forms.register" className="register" onSubmit={(info) => this.registerUser(info)} >
        <label htmlFor="register-username">username:</label>
        <Control.text model="forms.register.username" id="register-username" required
            validators={{
              maxLength: (val) => val.length <= 30
            }}
            validateOn="blur"
          />
        <Errors
            style={errorStyles}
            className="errors"
            model="forms.register.username"
            show="touched"
            messages={{
              valueMissing: 'username is required',
              maxLength: 'Must be 30 characters or less'
            }}
          />
        <br />
        <label htmlFor="register-email">email:</label>
        <Control type="email" model="forms.register.email" id="register-email" required />
        <Errors
            style={errorStyles}
            className="errors"
            model="forms.register.email"
            show="touched"
            messages={{
              valueMissing: 'email is required',
              typeMismatch: 'invalid email address',
            }}
          />
        <br />
        <label htmlFor="register-password">password:</label>
        <Control type="password" model="forms.register.password" id="register-password" required
          validators={{
            minLength: (val) => val.length >= 8,
            // passwordsMatch: this.checkPasswordsMatch
          }}
          validateOn="change"
          />
        <Errors
          style={errorStyles}
          className="errors"
          model="forms.register.password"
          show="touched"
          messages={{
            minLength: "must be atleast 8 characters"
          }}
          />
        <br />
        {/* <label htmlFor="register-password-confirm">re-type password:</label>
        <Control type="password" model="forms.register.passwordConfirm" id="register-password-confirm" required
            validators={{
              passwordsMatch: this.checkPasswordsMatch
            }}
            validateOn="change"
          />
        <Errors
            style={errorStyles}
            className="errors"
            model="forms.register.passwordConfirm"
            show="touched"
            messages={{
              passwordsMatch: 'Passwords do not match'
            }}
          />
        <br /> */}
        <button type="submit">register</button>
      </Form>
    );
  }
}


export default connect()(RegistrationForm);
