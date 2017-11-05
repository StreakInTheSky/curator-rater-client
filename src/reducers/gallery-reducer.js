import {
  FETCH_GALLERY_INFO_SUCCESS,
  FETCH_GALLERY_INFO_ERROR,
  ADD_FAVORITE_GALLERY_ERROR,
  REMOVE_FAVORITE_GALLERY_ERROR
} from '../actions/gallery'

const initialState = {
  id: null,
  title: '',
  description: '',
  tags: [],
  images: [],
  user: '',
  created_at: '',
  favorited_by: []
}

export default function(state = initialState, action) {
  if (action.type === FETCH_GALLERY_INFO_SUCCESS) {
    state = Object.assign({}, state, action.payload)
  } else if (action.type === FETCH_GALLERY_INFO_ERROR) {
    console.error(action.payload)
  } else if (action.type === ADD_FAVORITE_GALLERY_ERROR) {
    console.error(action.error)
  } else if (action.type === REMOVE_FAVORITE_GALLERY_ERROR) {
    console.error(action.error)
  }

  return state
}
