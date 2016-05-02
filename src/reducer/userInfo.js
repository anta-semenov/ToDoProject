import { fromJS } from 'immutable'
import * as actionTypes from '../constants/actionTypes'

export default function userInfo(state = fromJS({}), action) {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return setUserInfo(state, action.userInfo)
    case actionTypes.CLEAR_USER_INFO:
      return clearUserInfo()
    default:
      return state
  }
}

function setUserInfo(state, userInfo) {
  return state.merge(fromJS(userInfo))
}

function clearUserInfo() {
  return fromJS({})
}
