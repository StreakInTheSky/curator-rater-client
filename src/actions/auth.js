import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form'
import {API_BASE_URL} from '../config.js';
import {saveAuthToken, clearAuthToken} from '../local-storage'

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = (authToken) => ({
  type: SET_AUTH_TOKEN,
  authToken
})

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user
})

export const loginUser = (data) => dispatch => {
  const credentials = {
    username: data.email,
    password: data.password
  }

  const url = `${API_BASE_URL}/auth/login`;
  return axios.post(url, null, {
      auth: credentials
    })
    .then(res => {
      const decodedToken = jwtDecode(res.data.authToken)
      const data = {
        authToken: res.data.authToken,
        user: decodedToken.user
      }
      dispatch(setAuthToken(data.authToken))
      dispatch(setCurrentUser(data.user))
      saveAuthToken(data.authToken)
      return data.user
    })
    .then(user => Promise.resolve(user))
    .catch(err => {
      if (err.response.status === 401) {
        return Promise.reject(
          new SubmissionError({
            _error: 'Incorrect username or password'
          })
        )
      }
      return Promise.reject(
        new SubmissionError({
          [err.response.status]: err.response.statusText
        })
      )
    })
}

export const refreshAuthToken = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const url = `${API_BASE_URL}/auth/refresh`
  return axios.post(url, null, {
    headers: { 'Authorization': `Bearer ${authToken}` }
  })
    .then(res => {
      const decodedToken = jwtDecode(res.data.authToken)
      const data = {
        authToken: res.data.authToken,
        user: decodedToken.user
      }
      dispatch(setAuthToken(data.authToken))
      dispatch(setCurrentUser(data.user))
      saveAuthToken(data.authToken)
      return Promise.resolve()
    })
    .catch(err => {
      if (err.response.status === 401) {
        dispatch(setCurrentUser(null));
        dispatch(setAuthToken(null));
        clearAuthToken(authToken);
      }
    })
}
