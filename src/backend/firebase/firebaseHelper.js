import Firebase from 'firebase'
import { FIREBASE_APP_REFERENCE } from '../../constants/thierdPartyKeys'
import { fromJS } from 'immutable'

export function getStateForUser(userID, callback) {
  const appDataRef = new Firebase(FIREBASE_APP_REFERENCE + '/userData/' + userID)
  appDataRef.once('value', (data) => {
    console.log(data);
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

export const setStateForUser = store => next => action => {
  let result = next(action)

  //will update each key

  return result
}
