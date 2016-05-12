import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import Firebase from 'firebase'
import { FIREBASE_APP_REFERENCE } from './constants/thierdPartyKeys'
import { getStateForUser } from './backend/firebase/firebaseHelper'
import initFirebaseListeners from './backend/firebase/listeners'
import { fromJS } from 'immutable'

function authHandler(authData) {
  getStateForUser(authData.uid, false, (state) => {

    const store = configureStore(
      (state.get('userInfo') ? state : state.set('userInfo', fromJS({
        uid: authData.uid,
        hasAccount: true
      })))
    )

    initFirebaseListeners(store)

    ReactDOM.render(<Root store={store}/>, document.getElementById('root'))
  })
}

const appRootRef = new Firebase(FIREBASE_APP_REFERENCE)

const authData = appRootRef.getAuth()

if (authData) {
  authHandler(authData)
} else {
  appRootRef.authWithPassword({
    email: 'anta.semenov@gmail.com',
    password: 'sungreen'
  }, (error, authData) => {
    if (!error) {
      authHandler(authData)
    }
  })
}
