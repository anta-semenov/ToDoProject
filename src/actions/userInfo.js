import * as actionTypes from '../constants/ActionTypes'

export function setUserInfo(userInfo) {
  return {type: actionTypes.SET_USER_INFO, userInfo}
}

export function clearUserInfo() {
  return {type: actionTypes.CLEAR_USER_INFO}
}
