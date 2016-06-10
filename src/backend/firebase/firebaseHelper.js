/*global Promise*/
import Firebase from 'firebase'
import { FIREBASE_APP_REFERENCE } from '../../constants/thierdPartyKeys'
import { fromJS, Set } from 'immutable'
import mainUpdater from './mainUpdater'
import * as actionTypes from '../../constants/actionTypes'
import * as commonActions from '../../actions/commonActions'
import listeners from './listeners'

export function getStateForUser(userID, callback) {
  const userDataKey = FIREBASE_APP_REFERENCE + '/userData/' + userID

  //will query tasks, projects and contexts separate, because we can load only uncompleted tasks and projects

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

  //Should query max task and project keys, because we can have completed tasks and projects with key bigger then max key in state, so we nee to avoid additional load
  promises.push(taskRef.orderByKey().limitToLast(1).once('value'))
  promises.push(projectRef.orderByKey().limitToLast(1).once('value'))

  Promise.all(promises).then(result => {
    const tasks = result[0].val()
    if (tasks) {
      Object.keys(tasks).forEach(item => {
        if (tasks[item]['contexts']) {
          tasks[item]['contexts'] = Set(tasks[item]['contexts'])
        }
      })
    }
    if (!tasks && !result[1].val() && !result[2].val()) {
      callback()
    } else {
      callback(
        fromJS({
          task: (tasks || {}),
          project: (result[1].val() || {}),
          context: (result[2].val() || {})
        }),
        {
          maxTaskKey: Object.keys(result[3].val())[0],
          maxProjectKey: Object.keys(result[4].val())[0]
        }
      )
    }
  })
}

export const firebaseUpdateMiddleware = store => next => action => {
  let result = next(action)

  if (action.meta_notUpdateFirebase) {
    return result
  }

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

function setFirebaseState(userID, state) {
  const userDataKey = FIREBASE_APP_REFERENCE + '/userData/' + userID
  const userDataRef = new Firebase(userDataKey)

  userDataRef.set({
    task: state.get('task').toJS(),
    project: state.get('project').toJS(),
    context: state.get('context').toJS()
  })
}

export const setUserInfoMiddleware = store => next => action => {
  if (action.type === actionTypes.SET_USER_INFO) {
    listeners.clearListeners(store.getState())
    let result = next(action)
    const state = store.getState()
    getStateForUser(
      state.getIn(['userInfo','uid']),
      (state, properties) => {
        if (state) {
          store.dispatch(commonActions.setState(state))
          listeners.initFirebaseListeners(store, properties)
        } else {
          setFirebaseState(state.getIn(['userInfo','uid']), store.getState())
        }
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
