import axios from 'axios';
import jwtDecode from 'jwt-decode';
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
  const credentials = {
    username: data.email,
    password: data.password
  }

  const url = `${API_BASE_URL}/auth/login`;
  axios.post(url, null, {
      auth: credentials
    })
    .then(res => {
      const decodedToken = jwtDecode(res.data.authToken)
      const data = {
        authToken: res.data.authToken,
        user: decodedToken.user
      }
      dispatch(loginUserSuccess(data))
    })
    .catch(err => dispatch(loginUserError(err)))
}
