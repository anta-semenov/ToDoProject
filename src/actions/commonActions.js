import * as actionTypes from '../constants/actionTypes'
import { auth, unAuth } from '../backend/firebase/api.js'

export function setState(state) {
  return {type: actionTypes.SET_STATE, state}
}

export const login = (type) => (dispatch) => {
  dispatch({type: actionTypes.REQUEST_AUTH})
  return auth(type).then(
    response => dispatch(recieveAuth(response.user)),
    error => {
      dispatch({
        type: actionTypes.ERROR_AUTH,
        errorMessage: error.message || 'Something went wrong',
        errorCode: error.code
      })
    }
  )
}


export const recieveAuth = (userData) => ({type: actionTypes.RECIEVE_AUTH, userData})

export const logout = () => ({type: actionTypes.LOG_OUT})

export const logoutThunk = () => (dispatch) => {
  return unAuth().then(() => dispatch({type: actionTypes.LOG_OUT}))
}
