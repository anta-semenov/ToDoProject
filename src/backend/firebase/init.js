import { fromJS } from 'immutable'
import app, { subscribeToDataUpdate, unsubscribeFromDataUpdate } from './api.js'
import { recieveAuth, logout, errorAuth, requestAuth, setState } from '../../actions/commonActions'
import * as taskActions from '../../actions/taskActions'
import * as projectActions from '../../actions/projectActions'
import * as contextActions from '../../actions/contextActions'
import * as orderActions from '../../actions/orderActions'
import { getUid, getClientId } from '../../reducer'
import { capitalize } from '../../utils/string'
import uniqueKey from '../../utils/uniqueKeyGenerator'
import { DATA_TYPES, INITIAL_UI_STATE } from '../../constants/defaults'


const initFirebase = (store) => {
  store.dispatch(requestAuth())
  app.auth().onAuthStateChanged((userData) => onAuth(userData, store), (error) => store.dispatch(errorAuth(error)))
}
export default initFirebase

const onAuth = (userData, store) => {
  if (userData && userData.uid && userData.uid !== getUid(store.getState())) {
    unsubscribeFromDataUpdates(store)
    store.dispatch(recieveAuth(userData, uniqueKey()))
    subscribeToDataUpdates(store)
  } else if (!userData || !userData.uid) {
    unsubscribeFromDataUpdates(store)
    store.dispatch(logout())
    store.dispatch(setState(fromJS({ task: {}, project: {}, context: {}, tracking: {}, order: {}, uiState: INITIAL_UI_STATE })))
  }
}

const subscribeToDataUpdates = (store) => {
  const actions = { taskActions, projectActions, contextActions, orderActions }
  const uid = getUid(store.getState())
  DATA_TYPES.forEach(type => {
    switch (type) {
      case 'tracking':
        subscribeToDataUpdate(uid, type, '', 'child_removed', data => store.dispatch(actionClientIdEnchancer(setState(fromJS({ tracking: {} })), data.getPriority())))
        subscribeToDataUpdate(uid, type, '', 'child_added', data => store.dispatch(actionClientIdEnchancer(setState(fromJS({ tracking: { [data.key]: data.val()} })), data.getPriority())))
        break
      case 'order':
        subscribeToDataUpdate(uid, type, '', 'child_changed', editData(type, store, actions))
        break
      default:
      subscribeToDataUpdate(uid, type, uniqueKey(), 'child_added', addData(type, store, actions))
      subscribeToDataUpdate(uid, type, '', 'child_removed', data => store.dispatch(actions[`${type}Actions`][`remove${capitalize(type)}`](data.key)))
      subscribeToDataUpdate(uid, type, '', 'child_changed', editData(type, store, actions))
    }
  })
}
const addData = (type, store, actions) => (data) => {
  if (getClientId(store.getState()) !== data.getPriority()) {
    store.dispatch(actionClientIdEnchancer(actions[`${type}Actions`][`add${capitalize(type)}`](data.val()), data.getPriority()))
  }
}
const editData = (type, store, actions) => (data) => {
  if (getClientId(store.getState()) !== data.getPriority()) {
    store.dispatch(actionClientIdEnchancer(actions[`${type}Actions`][`replace${capitalize(type)}`](data.key, data.val()), data.getPriority()))
  }
}
const actionClientIdEnchancer = (action, clientId) => ({ ...action, clientId })

const unsubscribeFromDataUpdates = (store) => {
  const uid = getUid(store.getState())
  DATA_TYPES.forEach(type => unsubscribeFromDataUpdate(uid, type))
}
