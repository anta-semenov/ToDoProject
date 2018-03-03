import React from 'react'
import ReactDOM from 'react-dom'
import { fromJS } from 'immutable'
import Root from './containers/Root.js'
import thunk from 'redux-thunk'
import configureStore from './store/configureStore'
import initFirebase from './backend/firebase/init'
import { loadState, saveState } from './backend/localStore'
import throttle from 'lodash/throttle'
import firebaseUpdateMiddleware from './backend/firebase/middleware'
import { AUTH_NONE } from './constants/authStatus'

const store = configureStore(loadState(), [thunk, firebaseUpdateMiddleware])
store.subscribe(throttle(() => {
  const state = store.getState()
  if (state.getIn(['auth', 'authStatus'], undefined) === AUTH_NONE) {
    saveState(fromJS({
      task: state.get('task', fromJS([])),
      context: state.get('context', fromJS([])),
      project: state.get('project', fromJS([])),
      tracking: state.get('tracking', fromJS([])),
      order: state.get('order', fromJS([]))
    }))
  }
}, 1500))

initFirebase(store)

ReactDOM.render(<Root store={store}/>, document.getElementById('root'))
