import Firebase from 'firebase'
import { FIREBASE_APP_REFERENCE } from '../../constants/thierdPartyKeys'
import { fromJS } from 'immutable'
import mainUpdater from './mainUpdater'

export function getStateForUser(userID, callback) {
  const appDataRef = new Firebase(FIREBASE_APP_REFERENCE + '/userData/' + userID)
  appDataRef.once('value', (data) => {
    const userData = data.val()
    if (userData) {
      callback(fromJS(userData))
    } else {
      callback()
    }
  }, () => {
    callback()
  })
}

export const firebaseUpdateMiddleware = store => next => action => {
  let result = next(action)

  const updateObject = mainUpdater(action, store.getState())
  let userID = store.getState().getIn(['userInfo', 'uid'], undefined)
  if (!userID) {
    const appRootRef = new Firebase(FIREBASE_APP_REFERENCE)
    const authData = appRootRef.getAuth()
    if (authData) {
      userID = authData.uid
    }
  }
  if (userID && updateObject != {}) {
    const userDataRef = new Firebase(FIREBASE_APP_REFERENCE + '/userData/' + userID)
    userDataRef.update(updateObject)
  }

  return result
}
