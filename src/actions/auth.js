import axios from 'axios';
import {API_BASE_URL} from '../config.js';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const loginUserSuccess = (data) => ({
    type: LOGIN_USER_SUCCESS,
    payload: data
});

export const LOGIN_USER_ERROR= 'LOGIN_USER_ERROR';
export const loginUserError = (error) => ({
    type: LOGIN_USER_ERROR,
    payload: error
});
export const loginUser = (data) => dispatch => {
  console.log(data)
  const credentials = {
    username: data.email,
    password: data.password
  }

  const url = `${API_BASE_URL}/auth/login`;
  axios.post(url, null, {
      auth: credentials
    })
    .then(res => dispatch(loginUserSuccess(res)))
    .catch(err => dispatch(loginUserError(err)))
}
