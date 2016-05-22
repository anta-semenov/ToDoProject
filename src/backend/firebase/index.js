import firebaseHelper from './firebaseHelper'
import authentication from './authentication'

export const middleware = [
  ...firebaseHelper.middleware,
  authentication.authMiddleware
]

export function initFirebase(store, localStoreHelper) {
  authentication.initAuthListener(store, localStoreHelper)
}

export default {
  middleware,
  initFirebase
}
