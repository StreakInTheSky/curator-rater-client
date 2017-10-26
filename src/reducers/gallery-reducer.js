import {
  FETCH_GALLERY_INFO_SUCCESS,
  FETCH_GALLERY_INFO_ERROR
} from '../actions/user'

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
  }

  return state
}
