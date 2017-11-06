import {
  FETCH_GALLERIES_SUCCESS,
  FETCH_GALLERIES_ERROR,
  ADD_FAVORITE_GALLERY_ERROR,
  REMOVE_FAVORITE_GALLERY_ERROR
} from '../actions/gallery'

const initialState = {
  galleries: []
}

export default function(state = initialState, action) {
  if (action.type === FETCH_GALLERIES_SUCCESS) {
    state = Object.assign({}, state, { galleries: action.galleries})
  } else if (action.type === FETCH_GALLERIES_ERROR) {
    console.error(action.error)
  } else if (action.type === ADD_FAVORITE_GALLERY_ERROR) {
    console.error(action.error)
  } else if (action.type === REMOVE_FAVORITE_GALLERY_ERROR) {
    console.error(action.error)
  }

  return state
}
