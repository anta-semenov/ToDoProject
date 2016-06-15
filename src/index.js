import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import thunk from 'redux-thunk'
import configureStore from './store/configureStore'
import initFirebase from './backend/firebase/init'
import { loadState, saveState } from './backend/localStore'
import throttle from 'lodash/throttle'
import firebaseUpdateMiddleware from './backend/firebase/middleware'

const store = configureStore(loadState(), [thunk, firebaseUpdateMiddleware])
store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1500))

initFirebase(store)

ReactDOM.render(<Root store={store}/>, document.getElementById('root'))
