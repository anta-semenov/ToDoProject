/*global Promise*/
import Firebase from 'firebase'
import { FIREBASE_APP_REFERENCE } from '../../constants/thierdPartyKeys'
import { fromJS, Set } from 'immutable'
import mainUpdater from './updaters'
import * as actionTypes from '../../constants/actionTypes'
import * as commonActions from '../../actions/commonActions'
import listeners from './listeners'

export function getStateForUser(userID, isGuestUser, callback) {
  const userDataKey = FIREBASE_APP_REFERENCE + (isGuestUser ? '/guestUserData/' : '/userData/') + userID

  //will query tasks, projects and contexts separatle, because we can load only uncompleted tasks and projects

  const promises = []

  //Task
  const taskRef = new Firebase(userDataKey + '/task')
  promises.push(taskRef.orderByChild('completed').equalTo(false).once('value'))

  //Projects
  const projectRef = new Firebase(userDataKey + '/project')
  promises.push(projectRef.orderByChild('completed').equalTo(false).once('value'))

  //Contects
  const contextRef = new Firebase(userDataKey + '/context')
  promises.push(contextRef.once('value'))

  Promise.all(promises).then(result => {
    const tasks = result[0].val()
    if (tasks) {
      Object.keys(tasks).forEach(item => {
        if (tasks[item]['contexts']) {
          tasks[item]['contexts'] = Set(tasks[item]['contexts'])
        }
      })
    }
    callback(fromJS({
      task: (tasks || {}),
      project: (result[1].val() || {}),
      context: (result[2].val() || {})
    }))
  })
}

export const firebaseUpdateMiddleware = store => next => action => {
  let result = next(action)

  const updateObject = mainUpdater(action, store.getState())
  let userID = store.getState().getIn(['userInfo', 'uid'], undefined)
  let hasAccount = store.getState().getIn(['userInfo', 'hasAccount'], false)
  if (!userID) {
    const appRootRef = new Firebase(FIREBASE_APP_REFERENCE)
    const authData = appRootRef.getAuth()
    if (authData) {
      userID = authData.uid
      hasAccount = true
    }
  }
  if (userID && updateObject != {} && hasAccount) {
    const userDataKey = FIREBASE_APP_REFERENCE + '/userData/' + userID
    const userDataRef = new Firebase(userDataKey)
    userDataRef.update(updateObject)
  }

  return result
}

export const setUserInfoMiddleware = store => next => action => {
  if (action.type === actionTypes.SET_USER_INFO) {
    listeners.clearListeners(store.getState())
    let result = next(action)
    const state = store.getState()
    getStateForUser(
      state.getIn(['userInfo','uid']),
      !state.getIn(['userInfo', 'hasAccount'], false),
      (state) => {
        store.dispatch(commonActions.setState(state))
        listeners.initFirebaseListeners(store)
      }
    )
    return result
  } else {
      next(action)
  }
}

export default {
  getStateForUser,
  firebaseUpdateMiddleware,
  setUserInfoMiddleware,
  middleware: [firebaseUpdateMiddleware, setUserInfoMiddleware]
}
