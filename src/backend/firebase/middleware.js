import app from './api.js'
import * as actionTypes from '../../constants/actionTypes'
import diff from 'immutablediff'
import { getUid, getClientId } from '../../reducer'

const firebaseUpdateMiddleware = store => next => action => {
  const saveToFirebase = passToFirebase(action.type) || action.saveToFirebase
  if (!saveToFirebase || (action.clientId && action.clientId !== getClientId(store.getState())) || !getUid(store.getState())) {
    return next(action)
  }
  const currentState = store.getState()
  const result = next(action)
  const nextState = store.getState()
  const difference = diff(currentState, nextState).toJS()

  if (difference.length > 0) {
    const updateObject = difference.reduce((updates, diff) => {
      const parsedPath = parsePath(diff.path)
      if (parsedPath.isPathToFirebaseData) {
        if (diff.op === 'remove') {
          return { ...updates, [diff.path]: null }
        } else if (parsedPath.isPathToObject) {
          return { ...updates, [diff.path]: {...diff.value, ['.priority']: getClientId(nextState) } }
        } else if (parsedPath.isTrackingPath) {
          return { ...updates, [diff.path]: diff.value || null }
        } else if (parsedPath.orderType) {
          if (updates[`/order/${parsedPath.orderType}`]) {
            return updates
          }
          return {
            ...updates,
            [`/order/${parsedPath.orderType}`]: {
              ...nextState.getIn(['order', parsedPath.orderType]).toJS(),
              ['.priority']: getClientId(nextState)
            }
          }
        } else {
          return { ...updates, [diff.path]: diff.value, [priorityForPath(parsedPath)]: getClientId(nextState) }
        }
      }
      return updates
    }, {})
    app.database().ref(`/userData/${getUid(nextState)}`).update(updateObject)
  }
  return result
}
export default firebaseUpdateMiddleware

const priorityForPath = parsePath => parsePath.type && parsePath.id ? `/${parsePath.type}/${parsePath.id}/.priority` : ''
const parsePath = path => {
  const typeReg = /(task|project|context|tracking|order)/
  const idReg = /\d+/
  const splitPath = path.split('/')
  return {
    type: typeReg.test(splitPath[1]) ? splitPath[1] : '',
    id: idReg.test(splitPath[2]) ? splitPath[2] : '',
    isPathToObject: splitPath.length === 3 && typeReg.test(splitPath[1]) && idReg.test(splitPath[2]),
    isPathToFirebaseData: typeReg.test(splitPath[1]),
    isTrackingPath: splitPath.length === 3 && typeReg.test(splitPath[1]) && splitPath[2].includes('task'),
    orderType: splitPath[1] === 'order' ? splitPath[2] : undefined
  }
}

const passToFirebase = actionType =>
  actionType === actionTypes.ADD_PROJECT ||
  actionType === actionTypes.REMOVE_PROJECT ||
  actionType === actionTypes.COMPLETE_PROJECT ||
  actionType === actionTypes.EDIT_PROJECT ||
  actionType === actionTypes.DELETE_PROJECT ||
  actionType === actionTypes.CHANGE_PROJECT_POSITION ||

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
  actionType === actionTypes.SET_TASK_SOMEDAY ||
  actionType === actionTypes.DELETE_TASK ||

  actionType === actionTypes.ADD_CONTEXT ||
  actionType === actionTypes.REMOVE_CONTEXT ||
  actionType === actionTypes.EDIT_CONTEXT ||
  actionType === actionTypes.SWITCH_TASK_CONTEXT ||
  actionType === actionTypes.DELETE_CONTEXT ||
  actionType === actionTypes.CHANGE_CONTEXT_POSITION ||

  actionType === actionTypes.PROCESS_STATE
