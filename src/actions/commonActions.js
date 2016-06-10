import { fromJS } from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import * as api from '../backend/firebase/api.js'

//Plain action creators
export const setState = (state) => ({ type: actionTypes.SET_STATE, state })
export const requestAuth = () => ({ type: actionTypes.REQUEST_AUTH })
export const recieveAuth = (userData) => ({ type: actionTypes.RECIEVE_AUTH, userData })
export const errorAuth = (error) => ({
  type: actionTypes.ERROR_AUTH,
  errorMessage: error.message || 'Something went wrong',
  errorCode: error.code
})
export const logout = () => ({ type: actionTypes.LOG_OUT })

export const requestData = (dataType) => ({ type: actionTypes.REQUEST_DATA, dataType })
export const recieveData = (dataType) => ({ type: actionTypes.RECIEVE_DATA, dataType })
export const errorData = (dataType, error) => ({ type: actionTypes.ERROR_DATA, dataType, error })


//Thunk action creators
export const login = (type) => (dispatch) => {
  dispatch(requestAuth())
  return api.auth(type).then(
    response => {
      if (response.user.uid) {
        dispatch(recieveAuth(response.user))
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

export const fetchData = (dataType) => (dispatch, getState) => {
  const uid = getState().getIn(['auth', 'uid'], undefined)
  if (uid) {
    dispatch(requestData(dataType))
    api.fetchData(uid, dataType).then(
      response => {
        dispatch(recieveData(dataType))
        if (response.val()) {dispatch(setState(fromJS({ [dataType]: response.val() }))) }
      },
      error => dispatch(errorData(dataType, error))
    )
  }
}
