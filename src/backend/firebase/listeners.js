import Firebase from 'firebase'
import { FIREBASE_APP_REFERENCE } from '../../constants/thierdPartyKeys'
import * as taskActions from '../../actions/taskActions'
import * as projectActions from '../../actions/projectActions'
import * as contextActions from '../../actions/contextActions'

export default function initFirebaseListeners(store) {
  const state = store.getState()

  //Get user data link
  if (!state.get('userInfo') || !state.getIn(['userInfo', 'hasAccount'])) {
    //if user doesn't have an account we don't need listeners, because we have only one client
    return
  }
  const userID = state.getIn(['userInfo', 'uid'])
  const userDataLink = FIREBASE_APP_REFERENCE + '/userData/' + userID

  //Task
  const taskRef = new Firebase(userDataLink + '/task')
  addListeners(taskRef, taskActions, state.get('task'), store)

  //Project
  const projectRef = new Firebase(userDataLink + '/project')
  addListeners(projectRef, projectActions, state.get('project'), store)

  //Context
  const contextRef = new Firebase(userDataLink + '/context')
  addListeners(contextRef, contextActions, state.get('context'), store)
}

function addListeners(ref, actionCreator, state, store) {
  const maxKey = state.keySeq().max()

  // add
  ref.orderByKey().startAt(increaseKey(maxKey)).on('child_added', dataShapshot => {
    store.dispatch(actionCreator.addTask(dataShapshot.val()))
  })
  // remove
  ref.orderByKey().on('child_removed', dataShapshot => {
    store.dispatch(actionCreator.removeTask(dataShapshot.key()))
  })
  // edit
  ref.orderByKey().on('child_changed', dataShapshot => {
    store.dispatch(actionCreator.editTask(dataShapshot.key(), dataShapshot.val()))
  })
}

function increaseKey(key) {
  if (key.substring(key.length-1) != 'z') {
    return key.substring(0, key.length-2) + 'z'
  } else if (key.substring(key.length-2) != 'z') {
    return key.substring(0, key.length-3) + 'z0'
  } else {
    return key.substring(0, key.length-4) + 'z00'
  }
}
