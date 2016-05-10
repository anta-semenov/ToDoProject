import Firebase from 'firebase'
import { FIREBASE_APP_REFERENCE } from '../../constants/thierdPartyKeys'
import { fromJS } from 'immutable'

export function getStateForUser(userID, callback) {
  const appDataRef = new Firebase(FIREBASE_APP_REFERENCE + '/userData/' + userID)
  appDataRef.once('value', (data) => {
    const userData = data.val()
    if (userData) {
      const temp = fromJS(userData)
      const temp2 = temp.set('task', temp.get('task').toMap()).set('project', temp.get('project').toMap()).set('context', temp.get('context').toMap())
      console.log(temp2);
      callback(temp2)
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
