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
  }
  if (action.type === actionTypes.CLEAR_USER_INFO) {
    saveUserInfo()
  }

  return next(action)
}

export function logActionWhenDisconect() {

}

export function getLoggedActions() {

}
