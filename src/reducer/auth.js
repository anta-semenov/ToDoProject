import { fromJS } from 'immutable'
import { REQUEST_AUTH, RECIEVE_AUTH, ERROR_AUTH, LOG_OUT } from '../actions/commonActions.js'
import { AUTH_IN_PROGRESS, AUTH_SUCESS, AUTH_ERROR } from '../constants/authStatus.js'


const auth = (state=fromJS({}), action) => {
  switch (action.type) {
    case REQUEST_AUTH:
      return state.set('authStatus', AUTH_IN_PROGRESS)
    case RECIEVE_AUTH:
      return state.withMutations(map => map
        .set('authStatus', AUTH_SUCESS)
        .set('uid', action.userData.uid)
        .set('userName', action.userData.displayName)
        .set('userImage', action.userData.photoURL)
      )
    case ERROR_AUTH:
      return state.withMutations(map => map
        .set('authStatus', AUTH_ERROR)
        .set('errorMessage', action.errorMessage)
      )
    case LOG_OUT:
      return fromJS({})
    default:
      return state
  }
}
export default auth
