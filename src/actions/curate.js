import axios from 'axios';
import {API_BASE_URL} from '../config.js'

export const FETCH_IMAGE_SUCCESS = 'FETCH_IMAGE_SUCCESS';
export const fetchImageSuccess = (data) => ({
    type: FETCH_IMAGE_SUCCESS,
    payload: data
});

export const FETCH_IMAGE_ERROR= 'FETCH_IMAGE_ERROR';
export const fetchImageError = (error) => ({
    type: FETCH_IMAGE_ERROR,
    payload: error
});

export const fetchImage = (imageUrl) => dispatch => {
  axios.get(`${API_BASE_URL}/fetch/image-url?imageUrl=${imageUrl}`, { responseType: 'blob' })
    .then(({data}) => dispatch(readFile(data)))
    .catch(error => dispatch(fetchImageError(error)))
};

export const readFile = (data) => dispatch => {
  const reader = new FileReader()
  reader.onloadend = () => dispatch(fetchImageSuccess(reader.result))
  reader.onerror = (error) => dispatch(fetchImageError(error))
  reader.readAsDataURL(data)
};

export const DELETE_IMAGE = 'DELETE_IMAGE';
export const deleteImage = (imageKey) => ({
  type: DELETE_IMAGE,
  payload: imageKey
});

export const VIEW_IMAGE = 'VIEW_IMAGE';
export const viewImage = (imageKey) => ({
  type: VIEW_IMAGE,
  payload: imageKey
});

export const UNVIEW_IMAGE = 'UNVIEW_IMAGE';
export const unviewImage = () => ({
  type: UNVIEW_IMAGE
});

export const ADD_TITLE = 'ADD_TITLE';
export const addTitle = (title) => ({
  type: ADD_TITLE,
  payload: title
});

export const ADD_DESCRIPTION = 'ADD_DESCRIPTION';
export const addDescription = (description) => ({
  type: ADD_DESCRIPTION,
  payload: description
});

export const ADD_TAG = 'ADD_TAG';
export const addTag = (key, tag) => ({
  type: ADD_TAG,
  key,
  tag
});

export const REMOVE_TAG = 'REMOVE_TAG';
export const removeTag = (key) => ({
  type: REMOVE_TAG,
  payload: key
});

export const SUBMIT_GALLERY_SUCCESS = 'SUBMIT_GALLERY_SUCCESS';
export const submitGallerySuccess = (data) => ({
    type: SUBMIT_GALLERY_SUCCESS,
    payload: data
});

export const SUBMIT_GALLERY_ERROR= 'SUBMIT_GALLERY_ERROR';
export const submitGalleryError = (error) => ({
    type: SUBMIT_GALLERY_ERROR,
    payload: error
});

export const submitGallery = ({user, title, description, addedImages}) => dispatch => {
  const gallery = {
    user,
    title,
    description
  }
  axios.post(`${API_BASE_URL}/gallery/`, { data: gallery })
  .then(res => {
    return Promise.all(addedImages.map(image => {
      const imageData = {
        path: image,
        gallery: res.data.id,
        user: res.data.user
      }
      return axios.post(`${API_BASE_URL}/image/`, { data: imageData })
        .catch(error => dispatch(submitGalleryError(error)))
    }))
  })
  .then(() => dispatch(submitGallerySuccess()))
  .catch(error => dispatch(submitGalleryError(error)));
};
