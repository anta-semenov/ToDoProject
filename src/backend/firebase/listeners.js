import Firebase from 'firebase'
import { FIREBASE_APP_REFERENCE } from '../../constants/thierdPartyKeys'
import * as taskActions from '../../actions/taskActions'
import * as projectActions from '../../actions/projectActions'
import * as contextActions from '../../actions/contextActions'

export default function initFirebaseListeners(store) {
  const state = store.getState()

  //Get user data link
  if (!state.get('userInfo')) {
    return
  }
  const userID = state.getIn(['userInfo', 'uid'])
  const guestUser = !state.getIn(['userInfo', 'hasAccount'], false)
  const userDataLink = FIREBASE_APP_REFERENCE + (guestUser ? '/guestUserData' : '/userData/') + userID

  //Task
  const maxTaskKey = state.get('task').keySeq().max()
  const taskRef = new Firebase(userDataLink + '/task')
  // add task
  taskRef.orderByKey().startAt(increaseKey(maxTaskKey)).on('child_added', dataShapshot => {
    store.dispatch(taskActions.addTask(dataShapshot.val()))
  })
  // remove task
  taskRef.orderByKey().on('child_removed', dataShapshot => {
    store.dispatch(taskActions.removeTask(dataShapshot.key()))
  })
  // edit task
  taskRef.orderByKey().on('child_changed', dataShapshot => {
    store.dispatch(taskActions.editTask(dataShapshot.key(), dataShapshot.val()))
  })

  //Project
  const maxProjectKey = state.get('project').keySeq().max()
  const projectRef = new Firebase(userDataLink + '/project')
  // add project
  projectRef.orderByKey().startAt(increaseKey(maxProjectKey)).on('child_added', dataShapshot => {
    store.dispatch(projectActions.addProject(dataShapshot.val()))
  })
  // remove project
  projectRef.orderByKey().on('child_removed', dataShapshot => {
    store.dispatch(projectActions.removeProject(dataShapshot.key()))
  })
  // edit project
  projectRef.orderByKey().on('child_changed', dataShapshot => {
    store.dispatch(projectActions.editProject(dataShapshot.key(), dataShapshot.val()))
  })

  //Context
  const maxContextKey = state.get('context').keySeq().max()
  const contextRef = new Firebase(userDataLink + '/context')
  // add context
  contextRef.orderByKey().startAt(increaseKey(maxContextKey)).on('child_added', dataShapshot => {
    store.dispatch(contextActions.addContext(dataShapshot.val()))
  })
  // remove context
  contextRef.orderByKey().on('child_removed', dataShapshot => {
    store.dispatch(contextActions.removeContext(dataShapshot.key()))
  })
  // edit context
  contextRef.orderByKey().on('child_changed', dataShapshot => {
    store.dispatch(contextActions.editContext(dataShapshot.key(), dataShapshot.val()))
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
