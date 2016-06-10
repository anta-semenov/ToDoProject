import { Map } from 'immutable'
import { REQUEST_AUTH, RECIEVE_AUTH, ERROR_AUTH, LOG_OUT } from '../constants/actionTypes'
import { AUTH_IN_PROGRESS, AUTH_SUCESS, AUTH_ERROR } from '../constants/authStatus'


const auth = (state = Map(), action) => {
  switch (action.type) {
    case REQUEST_AUTH:
      return Map().set('authStatus', AUTH_IN_PROGRESS)
    case RECIEVE_AUTH:
      return Map().withMutations(map => {
        map.set('authStatus', AUTH_SUCESS).set('uid', action.userData.uid)
        if (action.userData.displayName) {map.set('userImage', action.userData.displayName)}
        if (action.userData.photoURL) {map.set('userImage', action.userData.photoURL)}
        return map
      })
    case ERROR_AUTH:
      return Map().withMutations(map => map
        .set('authStatus', AUTH_ERROR)
        .set('errorMessage', action.errorMessage)
      )
    case LOG_OUT:
      return Map()

    default:
      return state
  }
}
export default auth
