import app from './api.js'
import * as actionTypes from '../../constants/actionTypes'
import diff from 'immutablediff'
import { getUid, getClientId } from '../../reducer'

const firebaseUpdateMiddleware = store => next => action => {
  if (!passToFirebase(action.type) || (action.clientId && action.clientId !== getClientId(store.getState()))) {
    return next(action)
  }
  const currentState = store.getState()
  const result = next(action)
  const nextState = store.getState()
  const difference = diff(currentState, nextState).toJS()

  if (difference.length > 0) {
    const updateObject = difference.reduce((updates, diff) => {
      if (parsePath(diff.path).isPathToFirebaseData) {
        if (diff.op === 'remove') {
          return { ...updates, [diff.path]: null }
        } else if (parsePath(diff.path).isPathToObject) {
          return { ...updates, [diff.path]: {...diff.value, ['.priority']: getClientId(nextState) } }
        } else if (parsePath(diff.path).isTrackingPath) {
          return { ...updates, [diff.path]: diff.value || null }
        } else {
          return { ...updates, [diff.path]: diff.value || null, [priorityForPath(diff.path)]: getClientId(nextState) }
        }
      }
      return updates
    }, {})
    app.database().ref(`/userData/${getUid(nextState)}`).update(updateObject)
  }
  return result
}
export default firebaseUpdateMiddleware

const priorityForPath = path => parsePath(path).type && parsePath(path).id ? `/${parsePath(path).type}/${parsePath(path).id}/.priority` : ''
const parsePath = path => {
  const typeReg = /(task|project|context|tracking)/
  const idReg = /\d+/
  return {
    type: typeReg.test(path.split('/')[1]) ? path.split('/')[1] : '',
    id: idReg.test(path.split('/')[2]) ? path.split('/')[2] : '',
    isPathToObject: path.split('/').length === 3 && typeReg.test(path.split('/')[1]) && idReg.test(path.split('/')[2]),
    isPathToFirebaseData: typeReg.test(path.split('/')[1]),
    isTrackingPath: path.split('/').length === 3 && typeReg.test(path.split('/')[1]) && path.split('/')[2].includes('task')
  }
}

const passToFirebase = actionType =>
  actionType === actionTypes.ADD_PROJECT ||
  actionType === actionTypes.REMOVE_PROJECT ||
  actionType === actionTypes.COMPLETE_PROJECT ||
  actionType === actionTypes.EDIT_PROJECT ||

  actionType === actionTypes.ADD_TASK ||
  actionType === actionTypes.REMOVE_TASK ||
  actionType === actionTypes.COMPLETE_TASK ||
  actionType === actionTypes.EDIT_TASK ||
  actionType === actionTypes.ADD_TASK_TO_PROJECT ||
  actionType === actionTypes.ADD_TASK_CONTEXT ||
  actionType === actionTypes.REMOVE_TASK_CONTEXT ||
  actionType === actionTypes.SET_TASK_TODAY ||
  actionType === actionTypes.START_TASK_TRACKING ||
  actionType === actionTypes.STOP_TASK_TRACKING ||

  actionType === actionTypes.ADD_CONTEXT ||
  actionType === actionTypes.REMOVE_CONTEXT ||
  actionType === actionTypes.EDIT_CONTEXT ||
  actionType === actionTypes.SWITCH_TASK_CONTEXT ||

  actionType === actionTypes.UNDO ||
  actionType === actionTypes.REDO
