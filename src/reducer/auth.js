import { Map } from 'immutable'
import { REQUEST_AUTH, RECIEVE_AUTH, ERROR_AUTH, LOG_OUT } from '../constants/actionTypes'
import { AUTH_IN_PROGRESS, AUTH_SUCESS, AUTH_ERROR, AUTH_NONE } from '../constants/authStatus'


const auth = (state = Map(), action) => {
  switch (action.type) {
    case REQUEST_AUTH:
      return Map().set('authStatus', AUTH_IN_PROGRESS)
    case RECIEVE_AUTH:
      return Map().withMutations(map => {
        map.set('authStatus', AUTH_SUCESS).set('uid', action.userData.uid)
        if (action.userData.providerData[0].displayName) {map.set('userName', action.userData.providerData[0].displayName)}
        if (action.userData.providerData[0].photoURL) {map.set('userImage', action.userData.providerData[0].photoURL)}
        if (action.clientId) {map.set('clientId', action.clientId)}
        return map
      })
    case ERROR_AUTH:
      return Map().withMutations(map => map
        .set('authStatus', AUTH_ERROR)
        .set('errorMessage', action.errorMessage)
      )
    case LOG_OUT:
      return Map({
        authStatus: AUTH_NONE
      })

    default:
      return state
  }
}
export default auth

/*
 * Selectors
 */
export const getUid = state => state.get('uid')
export const getClientId = state => state.get('clientId')
