import {
  SET_AUTH_TOKEN,
  SET_CURRENT_USER
} from '../actions/auth'

const initialState = {
  authToken: null,
  currentUser: null
}

export default function(state = initialState, action) {
  if (action.type === SET_AUTH_TOKEN) {
    return Object.assign({}, state, { authToken: action.authToken })
  } else if (action.type === SET_CURRENT_USER) {
    return Object.assign({}, state, { currentUser: action.user })
  }

  return state;
}
