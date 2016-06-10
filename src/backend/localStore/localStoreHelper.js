import uniqueKey from '../../utils/uniqueKeyGenerator'
import { Iterable } from 'immutable'
import * as actionTypes from '../../constants/actionTypes'

export function saveUserInfo(userInfo) {
  if (userInfo) {
    window.localStorage.setItem('userInfo', (Iterable.isIterable(userInfo) ? userInfo.toJS() : userInfo))
  } else {
    window.localStorage.removeItem('userInfo')
  }
}

export function getUserInfo() {
  const localUserData = window.localStorage.getItem('userInfo')
  if (localUserData && typeof localUserData === 'object' && localUserData.uid) {
    return localUserData
  } else {
    const newUserData = {
      uid: uniqueKey(),
      hasAccount: false
    }
    saveUserInfo(newUserData)
    return newUserData
  }
}

export const localStoreMiddleware = store => next => action => {
  if (action.type === actionTypes.SET_USER_INFO) {
    saveUserInfo(action.userInfo)
    if (!action.userInfo) {
      saveState()
    }
  }
  if (action.type === actionTypes.CLEAR_USER_INFO) {
    saveUserInfo()
    saveState()
  }

  let result = next(action)

  const newState = store.getState()
  if (!newState.getIn(['userInfo','hasAccount'], false)) {
    saveState(newState)
  } else {
    saveUIState(newState.get('uiState'))
  }

  return result
}

function saveState(state) {
  saveItem('state', state)
}

export function getState() {
  return window.localStorage.getItem('state')
}

function saveUIState(uiState) {
  saveItem('uiState', uiState)
}

export function getUIState() {
  return window.localStorage.getItem('uiState')
}

function saveItem(key, item) {
  if (item) {
    window.localStorage.setItem(key, (Iterable.isIterable(item) ? item.toJS() : item))
  } else {
    window.localStorage.removeItem(key)
  }
}

export function logActionWhenDisconect() {

}

export function getLoggedActions() {

}

export default {
  saveUserInfo,
  getUserInfo,
  localStoreMiddleware,
  getUIState,
  getState
}
