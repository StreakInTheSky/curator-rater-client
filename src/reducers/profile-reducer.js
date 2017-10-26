import {
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_ERROR,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR
} from '../actions/profile'

const initialState = {
  favorites: [],
  followers: [],
  following: [],
  galleries: [],
  id: '',
  username: ''
}

export default function(state = initialState, action) {
  if (action.type === FETCH_USER_INFO_SUCCESS) {
    state = Object.assign({}, state, action.payload)
  } else if (action.type === FETCH_USER_INFO_ERROR) {
    console.error(action.payload)
  } else if (action.type === CREATE_USER_SUCCESS) {
    console.log('created user:', action.payload)
  } else if (action.type === CREATE_USER_ERROR) {
    console.error(action.payload)
  }

  return state
}
