import app from './api.js'
import { recieveAuth, logout, errorAuth, requestAuth, fetchData } from '../../actions/commonActions'

const onAuth = (userData, store) => {
  if (userData && userData.uid) {
    store.dispatch(recieveAuth(userData))
    store.dispatch(fetchData('task'))
    store.dispatch(fetchData('project'))
    store.dispatch(fetchData('context'))
  } else {
    store.dispatch(logout())
  }
}

const initFirebase = (store) => {
  store.dispatch(requestAuth())
  app.auth().onAuthStateChanged((userData) => onAuth(userData, store), (error) => store.dispatch(errorAuth(error)))
}

export default initFirebase
