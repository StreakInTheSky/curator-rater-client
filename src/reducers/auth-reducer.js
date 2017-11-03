import {
  SET_AUTH_TOKEN,
  SET_CURRENT_USER,
  FETCH_CURRENT_USER_ERROR
} from '../actions/auth'

const initialState = {
  authToken: null,
  currentUser: null
}

export default function(state = initialState, action) {
  if (action.type === SET_AUTH_TOKEN) {
    return Object.assign({}, state, { authToken: action.authToken })
  } else if (action.type === SET_CURRENT_USER) {
    console.log('setting current user:', action.user)
    return Object.assign({}, state, { currentUser: action.user })
  } else if (action.type === FETCH_CURRENT_USER_ERROR) {
    console.error(action.error)
  }

  return state;
}
