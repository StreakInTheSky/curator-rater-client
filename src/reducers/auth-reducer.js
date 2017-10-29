import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR
} from '../actions/auth'

const initialState = {
  authToken: '',
  currentUser: '',
  id: ''
}

export default function(state = initialState, action) {
  if (action.type === LOGIN_USER_SUCCESS) {
    console.log(action.payload)
  } else if (action.type === LOGIN_USER_ERROR) {
    console.log(action.payload)
  }

  return state;
}
