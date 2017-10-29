import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR
} from '../actions/auth'

const initialState = {
  authToken: null,
  currentUser: null
}

export default function(state = initialState, action) {
  if (action.type === LOGIN_USER_SUCCESS) {
    return Object.assign({}, state, {
      authToken: action.payload.authToken,
      currentUser: action.payload.user
    })
  } else if (action.type === LOGIN_USER_ERROR) {
    console.log(action.payload)
  }

  return state;
}
