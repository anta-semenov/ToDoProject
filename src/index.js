import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import thunk from 'redux-thunk'
import configureStore from './store/configureStore'
import initFirebase from './backend/firebase/init'
import { loadState, saveState } from './backend/localStore'
import throttle from 'lodash/throttle'
import firebaseUpdateMiddleware from './backend/firebase/middleware'
import { undo, redo } from './actions/commonActions'

const store = configureStore(loadState(), [thunk, firebaseUpdateMiddleware])
store.subscribe(throttle(() => {
  saveState(store.getState().delete('past').delete('future'))
}, 1500))

initFirebase(store)

document.onkeydown = (e) => {
  event = e || window.event

  if (window.navigator.platform.includes('Mact')) {
    if (event.keyCode === 90 && event.metaKey) {
      store.dispatch(undo())
    } else if (event.keyCode == 89 && event.metaKey) {
      store.dispatch(redo())
    }
  } else {
    if (event.keyCode === 90 && event.ctrlKey) {
      store.dispatch(undo())
    } else if (event.keyCode == 89 && event.ctrlKey) {
      store.dispatch(redo())
    }
  }
}

ReactDOM.render(<Root store={store}/>, document.getElementById('root'))
