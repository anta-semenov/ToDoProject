/* global Promise */
import { fromJS } from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import * as api from '../backend/firebase/api'
import uniqueKey from '../utils/uniqueKeyGenerator'
import { DATA_TYPES } from '../constants/defaults'

//Plain action creators
export const setState = (state) => ({ type: actionTypes.SET_STATE, state })
export const requestAuth = () => ({ type: actionTypes.REQUEST_AUTH })
export const errorAuth = (error) => ({
  type: actionTypes.ERROR_AUTH,
  errorMessage: error.message || 'Something went wrong',
  errorCode: error.code
})
export const logout = () => ({ type: actionTypes.LOG_OUT })

export const requestData = () => ({ type: actionTypes.REQUEST_DATA })
export const recieveData = () => ({ type: actionTypes.RECIEVE_DATA })
export const errorData = (error) => ({ type: actionTypes.ERROR_DATA, error })

export const processState = () => ({ type: actionTypes.PROCESS_STATE })

export const undo = () => ({ type: actionTypes.UNDO })
export const redo = () => ({ type: actionTypes.REDO })
export const clearUndoRedo = () => ({ type: actionTypes.CLEAR_UNDO_REDO})


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
export const recieveAuth = (userData, clientId) => (dispatch) => {
  dispatch({ type: actionTypes.RECIEVE_AUTH, userData, clientId })
  dispatch(requestData())
  Promise.all(DATA_TYPES.map(dataType => api.fetchData(userData.uid, dataType, dataType === 'context' || dataType === 'tracking' ? null : false))).then(
    results => {
      dispatch(recieveData())
      dispatch(setState(results.reduce((newState, result, index) => newState.set(DATA_TYPES[index], fromJS(result.val() || {})), fromJS({}))))
      dispatch(processState())
    },
    error => dispatch(errorData(error))
  )
}
