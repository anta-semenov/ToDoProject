import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import Firebase from 'firebase'
import { FIREBASE_APP_REFERENCE } from './constants/thierdPartyKeys'
import { getStateForUser } from './backend/firebase/firebaseHelper'
import initFirebaseListeners from './backend/firebase/listeners'
import { fromJS } from 'immutable'
import { getStartUpUserInfo } from './backend/firebase/authentication'
import { getUserInfo } from './backend/localStore/localStoreHelper'

function authHandler(userInfo) {
  getStateForUser(userInfo.uid, !userInfo.hasAccount, (state) => {
    let tempState = state

    if (!state.get('userInfo')) {
      tempState = tempState.set('userInfo', fromJS(userInfo))
    }

    const store = configureStore(tempState)
    
    initFirebaseListeners(store)

    ReactDOM.render(<Root store={store}/>, document.getElementById('root'))
  })
}

getStartUpUserInfo(getUserInfo, authHandler)

// const appRootRef = new Firebase(FIREBASE_APP_REFERENCE)
// const authData = appRootRef.getAuth()
// console.log(authData);
//
// if (authData) {
//   authHandler(authData)
// } else {
//   appRootRef.authWithPassword({
//     email: 'anta.semenov@gmail.com',
//     password: 'sungreen'
//   }, (error, authData) => {
//     if (!error) {
//       authHandler(authData)
//     }
//   })
// }
