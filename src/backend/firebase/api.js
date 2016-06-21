import firebase from 'firebase'

const app = firebase.initializeApp({
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
export const fetchData = (uid, dataType, completedFilter) => app.database().ref(`/userData/${uid}/${dataType}`).orderByChild('completed').equalTo(completedFilter).once('value')
export const unAuth = () => app.auth().signOut()

export const subscribeToDataUpdate = (uid, dataType, maxKey, eventType, callback) => {
  app.database().ref(`/userData/${uid}/${dataType}`).orderByKey().startAt(maxKey).on(eventType, callback)
}
export const unsubscribeFromDataUpdate = (uid, dataType) => {
  app.database().ref(`/userData/${uid}/${dataType}`).off()
}