import { Map } from 'immutable'
import app from './api.js'
import { recieveAuth, logout, errorAuth, requestAuth, fetchData, setState } from '../../actions/commonActions'

const onAuth = (userData, store) => {
  if (userData && userData.uid) {
    store.dispatch(recieveAuth(userData))
    store.dispatch(fetchData())
  } else {
    store.dispatch(logout())
    store.dispatch(setState(Map({ task: {}, project: {}, context: {} })))
  }
}

const initFirebase = (store) => {
  store.dispatch(requestAuth())
  app.auth().onAuthStateChanged((userData) => onAuth(userData, store), (error) => store.dispatch(errorAuth(error)))
}

export default initFirebase
