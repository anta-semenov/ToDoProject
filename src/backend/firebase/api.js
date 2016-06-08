import firebase from 'firebase'
import { recieveAuth, logout } from '../../actions/commonActions'

const app = firebase.initializeApp({
  serviceAccount: {
    projectId: 'popping-torch-8030',
    clientEmail: 'work.semenov@gmail.com',
    privateKey: 'RXb42lDJzOKMNDA5eMYsJgKjZZIsdm2jflIrjkz5'
  },
  apiKey: 'AIzaSyB-Xq4_HuAv8moxKqJFlFMC-5c-s7JJoYQ',
  authDomain: 'popping-torch-8030.firebaseapp.com',
  databaseURL: 'https://popping-torch-8030.firebaseio.com'
})
export default app

export const auth = (type) => {
  switch (type) {
    case 'facebook':
      return app.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
    case 'google':
      return app.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    case 'twitter':
      return app.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
  }
}

export const onAuth = (userData, store) => {
  if (userData) {
    store.dispatch(recieveAuth(userData))
  } else {
    store.dispatch(logout())
  }
}

export const unAuth = () => {
  return app.auth().signOut()
}
