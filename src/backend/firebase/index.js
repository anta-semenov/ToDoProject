import firebaseHelper from './firebaseHelper'
import authentication from './authentication'

export const middleware = [
  ...firebaseHelper.middleware,
  authentication.authMiddleware
]

export function initFirebase(store) {
  authentication.initAuthListener(store)
}

export default {
  middleware,
  initFirebase
}
