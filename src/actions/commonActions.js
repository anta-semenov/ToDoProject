import * as actionTypes from '../constants/actionTypes'

export function setState(state) {
  return {type: actionTypes.SET_STATE, state}
}

export function logIn(parameters) {
  return {type: actionTypes.LOG_IN, parameters}
}

export function signIn(parameters) {
  return {type: actionTypes.SIGN_IN, parameters}
}

export function logOut() {
  return {type: actionTypes.LOG_OUT}
}
