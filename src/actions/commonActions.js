import * as actionTypes from '../constants/actionTypes'
import { auth, unAuth } from '../backend/firebase/api.js'

export function setState(state) {
  return {type: actionTypes.SET_STATE, state}
}

export const logIn = (type) => (dispatch) => {
  dispatch({type: actionTypes.REQUEST_AUTH})
  return auth(type).then(
    response => {
      dispatch({
        type: actionTypes.RECIEVE_AUTH,
        userData: response.user
      })
    },
    error => {
      dispatch({
        type: actionTypes.ERROR_AUTH,
        errorMessage: error.message || 'Something went wrong',
        errorCode: error.code
      })
    }
  )
}

export const logOut = () => (dispatch) => {
  return unAuth().then(() => dispatch({type: actionTypes.LOG_OUT}))
}
