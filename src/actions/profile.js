import axios from 'axios';
import {API_BASE_URL} from '../config.js';

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

export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const createUserSuccess = (data) => ({
    type: CREATE_USER_SUCCESS,
    payload: data
});

export const CREATE_USER_ERROR= 'CREATE_USER_ERROR';
export const createUserError = (error) => ({
    type: CREATE_USER_ERROR,
    payload: error
});
export const createUser = (data) => dispatch => {
  const url = `${API_BASE_URL}/user/`;
  axios.post(url, data)
    .then(res => dispatch(createUserSuccess(res)))
    .catch(err => dispatch(createUserError(err)))
}

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
  // const url = `${API_BASE_URL}/auth/`;
  // axios.post(url, data)
  //   .then(res => dispatch(loginUserSuccess(res)))
  //   .catch(err => dispatch(loginUserError(err)))
}
