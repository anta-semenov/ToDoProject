import * as actionTypes from '../constants/actionTypes'
import * as api from '../backend/firebase/api'
import uniqueKey from '../utils/uniqueKeyGenerator'

//Plain action creators
export const setState = (state) => ({ type: actionTypes.SET_STATE, state })
export const requestAuth = () => ({ type: actionTypes.REQUEST_AUTH })
export const recieveAuth = (userData, clientId) => ({ type: actionTypes.RECIEVE_AUTH, userData, clientId })
export const errorAuth = (error) => ({
  type: actionTypes.ERROR_AUTH,
  errorMessage: error.message || 'Something went wrong',
  errorCode: error.code
})
export const logout = () => ({ type: actionTypes.LOG_OUT })

export const requestData = () => ({ type: actionTypes.REQUEST_DATA })
export const recieveData = () => ({ type: actionTypes.RECIEVE_DATA })
export const errorData = (error) => ({ type: actionTypes.ERROR_DATA, error })


//Thunk action creators
export const login = (type) => (dispatch) => {
  dispatch(requestAuth())
  return api.auth(type).then(
    response => {
      if (response.user.uid) {
        dispatch(recieveAuth(response.user, uniqueKey()))
      }
      else {
        dispatch(errorAuth({ errorMessage: 'Authentification failed. There is no such user'}))
      }
    },
    error => dispatch(errorAuth(error))
  )
}

export const logoutThunk = () => (dispatch) => {
  return api.unAuth().then(() => dispatch(logout()))
}
