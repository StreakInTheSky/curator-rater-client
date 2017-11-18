import axios from 'axios';
import {API_BASE_URL} from '../config.js'
import { setCurrentUser } from './auth'

export const FETCH_GALLERIES_SUCCESS = 'FETCH_GALLERIES_SUCCESS';
export const fetchGalleriesSuccess = (galleries) => ({
    type: FETCH_GALLERIES_SUCCESS,
    galleries
});

export const FETCH_GALLERIES_ERROR= 'FETCH_GALLERIES_ERROR';
export const fetchGalleriesError = (error) => ({
    type: FETCH_GALLERIES_ERROR,
    error
});

export const ADD_FAVORITE_GALLERY_ERROR= 'ADD_FAVORITE_GALLERY_ERROR';
export const addFavoriteGalleryError = (error) => ({
    type: ADD_FAVORITE_GALLERY_ERROR,
    error
});

export const REMOVE_FAVORITE_GALLERY_ERROR= 'REMOVE_FAVORITE_GALLERY_ERROR';
export const removeFavoriteGalleryError = (error) => ({
    type: REMOVE_FAVORITE_GALLERY_ERROR,
    error
});

export const fetchGalleries = () => dispatch => {
  const url = `${API_BASE_URL}/gallery`
  axios.get(url)
    .then(res => dispatch(fetchGalleriesSuccess(res.data)))
    .catch(err => dispatch(fetchGalleriesError(err)))
}

export const addFavoriteGallery = (galleryId, userId) => dispatch => {
  const url = `${API_BASE_URL}/gallery/favorite`;
  axios.post(url, { galleryId, userId })
    .then(res => dispatch(setCurrentUser(res.data.updatedUser)))
    .catch(err => dispatch(addFavoriteGalleryError(err)))
}

export const removeFavoriteGallery = (galleryId, userId) => dispatch => {
  const url = `${API_BASE_URL}/gallery/unfavorite`;
  axios.post(url, { galleryId, userId })
    .then(res => dispatch(setCurrentUser(res.data.updatedUser)))
    .catch(err => dispatch(removeFavoriteGalleryError(err)))
}
