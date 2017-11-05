import axios from 'axios';
import {API_BASE_URL} from '../config.js'
import { setCurrentUser } from './auth'

export const FETCH_GALLERY_INFO_SUCCESS = 'FETCH_GALLERY_INFO_SUCCESS';
export const fetchGalleryInfoSuccess = (data) => ({
    type: FETCH_GALLERY_INFO_SUCCESS,
    payload: data
});

export const FETCH_GALLERY_INFO_ERROR= 'FETCH_GALLERY_INFO_ERROR';
export const fetchGalleryInfoError = (error) => ({
    type: FETCH_GALLERY_INFO_ERROR,
    payload: error
});

export const ADD_FAVORITE_GALLERY_ERROR= 'ADD_FAVORITE_GALLERY_ERROR';
export const addFavoriteGalleryError = (error) => ({
    type: ADD_FAVORITE_GALLERY_ERROR,
    error
});

export const fetchGalleryInfo = (galleryId) => dispatch => {
  const url = `${API_BASE_URL}/gallery/${galleryId}`;
  axios.get(url)
    .then(({data}) => dispatch(fetchGalleryInfoSuccess(data)))
    .catch(error => dispatch(fetchGalleryInfoError(error)))
}

export const addFavoriteGallery = (galleryId, userId) => dispatch => {
  const url = `${API_BASE_URL}/gallery/favorite`;
  axios.post(url, { galleryId, userId })
    .then(res => dispatch(setCurrentUser(res.data.updatedUser)))
    .catch(err => console.error(err.response))
}
