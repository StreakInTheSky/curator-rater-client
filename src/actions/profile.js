import axios from 'axios';
import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config.js';
import {refreshAuthToken} from './auth'

export const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
export const fetchUserInfoSuccess = (data) => ({
    type: FETCH_USER_INFO_SUCCESS,
    payload: data
});

export const FETCH_USER_INFO_ERROR= 'FETCH_USER_INFO_ERROR';
export const fetchUserInfoError = (error) => ({
    type: FETCH_USER_INFO_ERROR,
    payload: error
});

export const fetchUserInfo = (username) => dispatch => {
  const url = `${API_BASE_URL}/user/${username}`;
  axios.get(url)
    .then(({data}) => dispatch(fetchUserInfoSuccess(data)))
    .catch(error => dispatch(fetchUserInfoError(error)))
}

export const fetchUserById = (userId) => dispatch => {
  const url = `${API_BASE_URL}/user/id/${userId}`;
  axios.get(url)
    .then(({data}) => dispatch(fetchUserInfoSuccess(data)))
    .catch(error => dispatch(fetchUserInfoError(error)))
}

export const createUser = (data) => dispatch => {
  const url = `${API_BASE_URL}/user/`;
  return axios.post(url, data)
    .then(res => Promise.resolve(res.data))
    .catch(err => {
      if (
          err.response.headers['content-type'] &&
          err.response.headers['content-type'].startsWith('application/json')
      ) {
          // It's a nice JSON error returned by us, so decode it
          const {reason, message, location} = err.response.data;
          if (reason === 'ValidationError') {
            // Convert ValidationErrors into SubmissionErrors for Redux Form
            return Promise.reject(
              new SubmissionError({
                [location]: message
              })
            );
          }
        }
        // It's a less informative error returned by express
        return Promise.reject(
          new SubmissionError({
            [err.response.status]: err.response.statusText
          })
        );
    })
}

export const FOLLOW_USER_ERROR= 'FOLLOW_USER_ERROR';
export const followUserError = (error) => ({
    type: FOLLOW_USER_ERROR,
    payload: error
});

export const followUser = (followingId, myId) => dispatch => {
  const url = `${API_BASE_URL}/user/follow`
  axios.post(url, { followingId, followerId: myId})
    .then(() => dispatch(refreshAuthToken))
    .then(res => dispatch(fetchUserById(followingId)))
    .catch(err => dispatch(followUserError(err)))
}

export const unfollowUser = (followingId, myId) => dispatch => {
  const url = `${API_BASE_URL}/user/unfollow`
  axios.post(url, { followingId, followerId: myId})
    .then(() => dispatch(refreshAuthToken))
    .then(res => dispatch(fetchUserById(followingId)))
    .catch(err => dispatch(followUserError(err)))
}
