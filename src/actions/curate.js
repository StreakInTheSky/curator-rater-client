import axios from 'axios';
import { SubmissionError } from 'redux-form';
import AWS from 'aws-sdk';
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

// TODO: Get more secure way to get credentials

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: 'us-west-1',
  accessKeyId: 'AKIAJUROSBMKQBFZSB2A',
  secretAccessKey: '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',
  params: { Bucket: 'curator-rater-images' }
})

const uploadToS3 = (image, key, type) => {
  const params = {
    ACL: 'public-read',
    Key: key,
    Body: image,
    ContentEncoded: 'base64',
    ContentType: type
  }
  const uploader = s3.upload(params)
  return uploader.promise()
    .then(data => { return data.Location },
          err => { return Promise.reject(err) }
    )
    .then(location => Promise.resolve(location))
    .catch(err => Promise.reject(err))
}

const uploadGalleryImage = (imageData) => {
  return axios
    .post(`${API_BASE_URL}/image/`, imageData)
    .then(res => Promise.resolve(res))
    .catch(error => Promise.reject(error))
}


export const submitGallery = galleryData => dispatch => {
  const {title, description, images, user} = galleryData
  const galleryDetails = { title, description, user }
  let gallery

  return axios
    .post(`${API_BASE_URL}/gallery/`, { data: galleryDetails })
    .then(res => {
      gallery = res.data.id
      const imagePromises = images.map((image, index) => {
        return fetch(image)
          .then(res => res.blob())
          .then(blob => uploadToS3(blob, `${user}${Date.now()}${index}`, blob.type))
          .then(path => uploadGalleryImage({ path, user, gallery }))
        })
      return Promise.all(imagePromises)
    })
    .then(() => Promise.resolve())
    .then(() => dispatch(submitGallerySuccess()))
    .catch(err => {
      if (
          err.response.headers['content-type'] &&
          err.response.headers['content-type'].startsWith('application/json')
      ) {
          const {reason, message, location} = err.response.data;
          if (reason === 'ValidationError') {
            // Convert ValidationErrors into SubmissionErrors for Redux Form
            return Promise.reject(
              new SubmissionError({
                [location]: message
              })
            );
          }
        }
        // It's a less informative error returned by express
        return Promise.reject(
          new SubmissionError({
            [err.response.status]: err.response.statusText
          })
        );
    })
};
