import Firebase from 'firebase'
import { FIREBASE_APP_REFERENCE } from '../../constants/thierdPartyKeys'
import * as taskActions from '../../actions/taskActions'
import * as projectActions from '../../actions/projectActions'
import * as contextActions from '../../actions/contextActions'

export function initFirebaseListeners(store) {
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
  addListeners(
    taskRef,
    {
      add: taskActions.addTask,
      remove: taskActions.removeTask,
      edit: taskActions.editTask
    },
    state.get('task'),
    store
  )

  //Project
  const projectRef = new Firebase(userDataLink + '/project')
  addListeners(
    projectRef,
    {
      add: projectActions.addProject,
      remove: projectActions.removeProject,
      edit: projectActions.editProject
    },
    state.get('project'),
    store
  )

  //Context
  const contextRef = new Firebase(userDataLink + '/context')
  addListeners(
    contextRef,
    {
      add: contextActions.addContext,
      remove: contextActions.removeContext,
      edit: contextActions.editContext
    },
    state.get('context'),
    store
  )
}

function addListeners(ref, actionCreator, state, store) {
  const maxKey = state.keySeq().max()
  // add
  ref.orderByKey().startAt(increaseKey(maxKey)).on('child_added', dataShapshot => {
    store.dispatch(actionCreator.add(dataShapshot.val()))
  })
  // remove
  ref.orderByKey().on('child_removed', dataShapshot => {
    store.dispatch(actionCreator.remove(dataShapshot.key()))
  })
  // edit
  ref.orderByKey().on('child_changed', dataShapshot => {
    store.dispatch(actionCreator.edit(dataShapshot.key(), dataShapshot.val()))
  })
}

function increaseKey(key) {
  if (!key) {
    return '0'
  }
  if (key.substring(key.length-1) != 'z') {
    return key.substring(0, key.length-1) + 'z'
  } else if (key.substring(key.length-2) != 'z') {
    return key.substring(0, key.length-2) + 'z0'
  } else {
    return key.substring(0, key.length-3) + 'z00'
  }
}

function clearListeners(state) {
  if (!state.get('userInfo') || !state.getIn(['userInfo', 'hasAccount'])) {
    //if user doesn't have an account we don't need listeners, because we have only one client
    return
  }
  const userID = state.getIn(['userInfo', 'uid'])
  const userDataLink = FIREBASE_APP_REFERENCE + '/userData/' + userID
  //Task
  const taskRef = new Firebase(userDataLink + '/task')
  taskRef.off()

  //Project
  const projectRef = new Firebase(userDataLink + '/project')
  projectRef.off()

  //Context
  const contextRef = new Firebase(userDataLink + '/context')
  contextRef.off()
}

export default {
  initFirebaseListeners,
  clearListeners
}
