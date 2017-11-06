import axios from 'axios';
import {API_BASE_URL} from '../config.js'
import { setCurrentUser } from './auth'


export const VOTE_IMAGE_ERROR = 'VOTE_IMAGE_ERROR'
export const voteImageError = err => ({
  type: 'VOTE_IMAGE_ERROR',
  err
})

export const voteImage = (imageId, userId) => dispatch => {
  console.log('sending', {imageId, userId})
  const url = `${API_BASE_URL}/image/vote`
  return axios.post(url, {imageId, userId})
    .then(res => {
      console.log(res)
      return res
    })
    .then(res => dispatch(setCurrentUser(res.data)))
    .catch(err => dispatch(voteImageError(err)))
}
