import Firebase from 'firebase'
import { recieveAuth, logout } from '../../actions/commonActions'

const app = Firebase.initializeApp({
  serviceAccount: {
    projectId: 'popping-torch-8030',
    clientEmail: 'work.semenov@gmail.com',
    privateKey: 'RXb42lDJzOKMNDA5eMYsJgKjZZIsdm2jflIrjkz5'
  },
  databaseURL: 'https://popping-torch-8030.firebaseio.com/'
})
export default app

export const auth = (type) => {
  switch (type) {
    case 'facebook':
      return app.auth().signInWithPopup(new app.auth.FacebookAuthProvider())
    case 'google':
      return app.auth().signInWithPopup(new app.auth.GoogleAuthProvider())
    case 'twitter':
      return app.auth().signInWithPopup(new app.auth.TwitterAuthProvider())
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
