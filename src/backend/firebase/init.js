/* global Promise */
import { fromJS } from 'immutable'
import app, { subscribeToDataUpdate, unsubscribeFromDataUpdate } from './api.js'
import { recieveAuth, logout, errorAuth, requestAuth, requestData, recieveData, errorData, setState } from '../../actions/commonActions'
import * as taskActions from '../../actions/taskActions'
import * as projectActions from '../../actions/projectActions'
import * as contextActions from '../../actions/contextActions'
import { getUid } from '../../reducer'
import { capitalize } from '../../utils/string'
import uniqueKey from '../../utils/uniqueKeyGenerator'
import * as api from './api'
import { DATA_TYPES, INITIAL_UI_STATE } from '../../constants/defaults'


const initFirebase = (store) => {
  store.dispatch(requestAuth())
  app.auth().onAuthStateChanged((userData) => onAuth(userData, store), (error) => store.dispatch(errorAuth(error)))
}
export default initFirebase

const onAuth = (userData, store) => {
  if (userData && userData.uid) {
    store.dispatch(recieveAuth(userData))
    store.dispatch(requestData())
    Promise.all(DATA_TYPES.map(dataType => api.fetchData(userData.uid, dataType, dataType === 'context' ? null : false))).then(
      results => {
        store.dispatch(recieveData())
        store.dispatch(setState(results.reduce((newState, result, index) => newState.set(DATA_TYPES[index], fromJS(result.val() || {})), fromJS({}))))
        subscribeToDataUpdates(store)
      },
      error => store.dispatch(errorData(error))
    )
  } else {
    unsubscribeFromDataUpdates(store)
    store.dispatch(logout())
    store.dispatch(setState(fromJS({ task: {}, project: {}, context: {}, uiState: INITIAL_UI_STATE })))
  }
}

const subscribeToDataUpdates = (store) => {
  const actions = { taskActions, projectActions, contextActions }
  const uid = getUid(store.getState())
  DATA_TYPES.forEach(type => {
    subscribeToDataUpdate(uid, type, uniqueKey(), 'child_added', data => store.dispatch(actions[`${type}Actions`][`add${capitalize(type)}`](data.val())))
    subscribeToDataUpdate(uid, type, '', 'child_removed', data => store.dispatch(actions[`${type}Actions`][`remove${capitalize(type)}`](data.key)))
    subscribeToDataUpdate(uid, type, '', 'child_changed', data => store.dispatch(actions[`${type}Actions`][`edit${capitalize(type)}`](data.key, data.val())))
  })
}

const unsubscribeFromDataUpdates = (store) => {
  const uid = getUid(store.getState())
  DATA_TYPES.forEach(type => unsubscribeFromDataUpdate(uid, type))
}
