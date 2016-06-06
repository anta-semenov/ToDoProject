import firebaseHelper from './firebaseHelper'
import authentication from './authentication'
import app, { onAuth } from './api'
import { errorAuth } from '../../actions/commonActions.js'

export const middleware = [
  ...firebaseHelper.middleware,
  authentication.authMiddleware
]

export function initFirebase(store, localStoreHelper) {
  app.auth().onAuthStateChanged((userData) => onAuth(userData, store), (error) => store.dispatch(errorAuth(error)))
}

export default {
  middleware,
  initFirebase
}
