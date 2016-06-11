/* global Promise */
import { fromJS, Map } from 'immutable'
import app, { subscribeToDataUpdate, unsubscribeFromDataUpdate } from './api.js'
import { recieveAuth, logout, errorAuth, requestAuth, requestData, recieveData, errorData, setState } from '../../actions/commonActions'
import * as taskActions from '../../actions/taskActions'
import * as projectActions from '../../actions/projectActions'
import * as contextActions from '../../actions/contextActions'
import { getMaxKey, getUid } from '../../reducer'
import { capitalize } from '../../utils/string'
import * as api from './api'
import DATA_TYPES from '../../constants/defaults'

const onAuth = (userData, store) => {
  if (userData && userData.uid) {
    store.dispatch(recieveAuth(userData))
    store.dispatch(requestData())
    console.log(123)
    Promise.all(DATA_TYPES.map(dataType => api.fetchData(userData.uid, dataType))).then(
      results => {
        console.log(results)
        store.dispatch(recieveData())
        store.dispatch(setState(results.reduce((newState, result, index) => newState.set(DATA_TYPES[index], fromJS(result.val() || {})), fromJS({}))))
        subscribeToDataUpdates(store)
      },
      error => store.dispatch(errorData(error))
    )
  } else {
    unsubscribeFromDataUpdates(store)
    store.dispatch(logout())
    store.dispatch(setState(Map({ task: {}, project: {}, context: {} })))
  }
}

export const fetchData = (uid, store) => {
  if (uid) {
    store.dispatch(requestData())
    return Promise.all(DATA_TYPES.map(dataType => api.fetchData(uid, dataType)))
  }
}

const initFirebase = (store) => {
  store.dispatch(requestAuth())
  app.auth().onAuthStateChanged((userData) => onAuth(userData, store), (error) => store.dispatch(errorAuth(error)))
}

export default initFirebase

const subscribeToDataUpdates = (store) => {
  const actions = { taskActions, projectActions, contextActions }
  const uid = getUid(store.getState())
  DATA_TYPES.forEach(type => {
    const maxKey = getMaxKey(store.getState(), type)
    subscribeToDataUpdate(uid, type, maxKey, 'child_added', data => store.dispatch(actions[`${type}Action`][`add${capitalize(type)}`](data.val())))
    subscribeToDataUpdate(uid, type, maxKey, 'child_removed', data => store.dispatch(actions[`${type}Action`][`remove${capitalize(type)}`](data.key())))
    subscribeToDataUpdate(uid, type, maxKey, 'child_changed', data => store.dispatch(actions[`${type}Action`][`edit${capitalize(type)}`](data.val(), data.key())))
  })
}

const unsubscribeFromDataUpdates = (store) => {
  const uid = getUid(store.getState())
  DATA_TYPES.forEach(type => unsubscribeFromDataUpdate(uid, type))
}
