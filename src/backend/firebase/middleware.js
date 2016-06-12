import app from './api.js'
import mainUpdater from './updaters'

const firebaseUpdateMiddleware = store => next => action => {
  const result = next(action)
  const updateObject = mainUpdater(action, store.getState())
  const uid = store.getState().getIn(['auth', 'uid'], undefined)

  if (uid && updateObject != {}) {
    app.database().ref(`/userData/${uid}`).update(updateObject)
  }

  return result
}

export default firebaseUpdateMiddleware
