import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { fromJS } from 'immutable'
import firebase from './backend/firebase'
import localStore from './backend/localStore/localStoreHelper'

const store = configureStore(fromJS({}),[...firebase.middleware, localStore.localStoreMiddleware])

firebase.initFirebase(store)

ReactDOM.render(<Root store={store}/>, document.getElementById('root'))
