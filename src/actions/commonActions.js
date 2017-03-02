/* global Promise */
import { fromJS } from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import * as api from '../backend/firebase/api'
import uniqueKey from '../utils/uniqueKeyGenerator'
import { DATA_TYPES } from '../constants/defaults'
import { loadState } from '../backend/localStore'
import { INITIAL_STATE } from '../constants/defaults'

// Helper
const forceFirebaseEnchancer = (action) => ({...action, saveToFirebase: true})

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

export const logoutThunk = () => api.unAuth()
export const recieveAuth = (userData, clientId) => (dispatch) => {
  dispatch({ type: actionTypes.RECIEVE_AUTH, userData, clientId })
  dispatch(requestData())
  Promise.all(DATA_TYPES.map(dataType => {
    let filter
    switch (dataType) {
      case 'context':
        filter = {type: '<=', key:'deleted', value: false}
        break
      case 'task':
      case 'project':
        filter = {type: '<=', key:'completedDeleted', value: false}
        break
      default:
        filter = {}
        break
    }
    return api.fetchData(userData.uid, dataType, filter)
  })).then(
    results => {

      // Check if there exist any data in this account. If not, then we will try to load data from local storage, and then from initial state
      const doesDataExist = results.reduce((check, result) => check || result.val() !== null, false)
      if (doesDataExist) {
        dispatch(setState(results.reduce((newState, result, index) => newState.set(DATA_TYPES[index], fromJS(result.val() || {})), fromJS({}))))
      } else {
        dispatch(setState(INITIAL_STATE)) // Reset state, so diff function in firebase middleware could find difference
        dispatch(forceFirebaseEnchancer(setState(loadState() || INITIAL_STATE)))
      }
      dispatch(processState())
      dispatch(recieveData())
    },
    error => dispatch(errorData(error))
  )
}
