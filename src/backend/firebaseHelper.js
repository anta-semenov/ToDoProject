import Firebase from 'firebase'
import { FIREBASE_APP_REFERENCE } from '../constants/thierdPartyKeys'
import { fromJS } from 'immutable'

export function getStateForUser(userID, callback) {
  const appDataRef = new Firebase(FIREBASE_APP_REFERENCE + '/userData/' + userID)
  appDataRef.once('value', (data) => {
    const userData = data.val()
    if (userData) {
      callback(fromJS(userData))
    } else {
      callback()
    }
    callback(data.val())
  }, () => {
    callback()
  })
}

export const setStateForUser = store => next => action => {
  let result = next(action)
  const appRootRef = new Firebase(FIREBASE_APP_REFERENCE)
  const authData = appRootRef.getAuth()
  if (authData) {
    const appDataRef = new Firebase(FIREBASE_APP_REFERENCE + '/userData/' + authData.uid)
    try {
      appDataRef.set(store.getState().toJS())
    } catch (e) {
      console.log(e);
    }   
  }
  return result
}
