import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { fromJS } from 'immutable'
import * as firebase from './backend/firebase'
import * as localStore from './backend/localStore/localStoreHelper'

const store = configureStore(fromJS({}),[...firebase.middleware, localStore.localStoreMiddleware])

firebase.initFirebase(store, localStore)

ReactDOM.render(<Root store={store}/>, document.getElementById('root'))

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
