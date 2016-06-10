import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import thunk from 'redux-thunk'
import configureStore from './store/configureStore'
import { fromJS } from 'immutable'
import firebase from './backend/firebase'
import initFirebase from './backend/firebase/init'
import localStore from './backend/localStore/localStoreHelper'

const store = configureStore(fromJS({}), [thunk, ...firebase.middleware, localStore.localStoreMiddleware])

initFirebase(store)

ReactDOM.render(<Root store={store}/>, document.getElementById('root'))
