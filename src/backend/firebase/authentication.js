import Firebase from 'firebase'
import { FIREBASE_APP_REFERENCE } from '../../constants/thierdPartyKeys'
import * as actionTypes from '../../constants/actionTypes'
import * as uiStateActions from '../../actions/uiStateActions'
import * as userInfoActions from '../../actions/userInfoActions'

export function getStartUpUserInfo(localStorageHelper, callback) {
  const appRef = new Firebase(FIREBASE_APP_REFERENCE)
  const authData = appRef.getAuth()
  let userInfo
  if (authData) {
    userInfo = {
      uid: authData.uid,
      hasAccount: true
    }
    if (authData.provider === 'facebook') {
      userInfo.userName = authData.facebook.displayName
    }
  } else {
    userInfo = localStorageHelper.getUserInfo()
  }

  if (callback) {
    callback(userInfo)
  }

  return userInfo
}

export function emailLogin(email, password, authCallback, errorCallback) {
  const appRef = new Firebase(FIREBASE_APP_REFERENCE)
  appRef.authWithPassword(
    {email, password},
    (error, authData) => {
      if (error) {
        errorCallback(error)
      } else {
        authCallback(authData)
      }
    }
  )
}

export function providerLogin(provider, authCallback, errorCallback, usePopup) {
  const appRef = new Firebase(FIREBASE_APP_REFERENCE)
  if (usePopup) {
    oauthPopup(appRef, provider, authCallback, errorCallback)
  } else {
    appRef.authWithOAuthRedirect(provider, errorCallback)
  }
}

function oauthPopup(ref, provider, authCallback, errorCallback) {
  ref.authWithOAuthPopup(provider, (error, authData) => {
    if (error) {
      if (error.code === 'TRANSPORT_UNAVAILABLE') {
        ref.authWithOAuthRedirect(provider, errorCallback)
      } else {
        errorCallback(error)
      }
    } else if (authData) {
      authCallback(authData)
    }
  })
}

function unauth() {
  const appRef = new Firebase(FIREBASE_APP_REFERENCE)
  appRef.unauth()
}

export const authMiddleware = store => next => action => {
  const errorCallback = error => {
    store.dispatch(uiStateActions.setAuthErrorMessage(error.message))
  }
  const authCallback = () => {
    store.dispatch(uiStateActions.setAuthErrorMessage())
  }
  switch (action.type) {
    case actionTypes.LOG_OUT:
      unauth()
      break
    case actionTypes.LOG_IN:
      switch (action.parameters.type) {
        case 'email':
          emailLogin(action.parameters.email, action.parameters.password, authCallback, errorCallback)
          break
        case 'facebook':
          providerLogin('facebook',authCallback, errorCallback, true)
          break
        case 'google':
          providerLogin('google',authCallback, errorCallback, true)
          break
      }
      break
  }
  return next(action)
}

/*
 * Auth listeners
 */
 export function initAuthListener(store, localStorageHelper) {
   const appRef = new Firebase(FIREBASE_APP_REFERENCE)
   appRef.onAuth(authData => {
     auth(authData, store, localStorageHelper.getUserInfo)
   })
 }

 function auth(authData, store, localStorageUserInfoGetter) {
   if (authData) {
     store.dispatch(uiStateActions.setAuthStatus(true))
     let userInfo = {
       uid: authData.uid,
       hasAccount: true
     }
     switch (authData.provider) {
       case 'facebook':
         userInfo.userName = authData.facebook.displayName
         break;
     }
     store.dispatch(userInfoActions.setUserInfo(userInfo))
   } else {
     store.dispatch(uiStateActions.setAuthStatus())
     let userInfo = {}
     if (localStorageUserInfoGetter) {
       userInfo = localStorageUserInfoGetter()
     }
     store.dispatch(userInfoActions.setUserInfo(userInfo))
   }
 }

export default {
  getStartUpUserInfo,
  initAuthListener,
  authMiddleware
}