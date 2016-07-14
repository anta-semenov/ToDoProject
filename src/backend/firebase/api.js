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
export const fetchData = (uid, dataType, filter = {}) => {
  switch (filter.type) {
    case '==':
      return app.database().ref(`/userData/${uid}/${dataType}`).orderByChild(filter.key).equalTo(filter.value).once('value')
    case '<=':
      return app.database().ref(`/userData/${uid}/${dataType}`).orderByChild(filter.key).endAt(filter.value).once('value')
    case '>=':
      return app.database().ref(`/userData/${uid}/${dataType}`).orderByChild(filter.key).startAt(filter.value).once('value')
    default:
      return app.database().ref(`/userData/${uid}/${dataType}`).once('value')
  }
}
export const unAuth = () => app.auth().signOut()

export const subscribeToDataUpdate = (uid, dataType, maxKey, eventType, callback) => {
  app.database().ref(`/userData/${uid}/${dataType}`).orderByKey().startAt(maxKey).on(eventType, callback)
}
export const unsubscribeFromDataUpdate = (uid, dataType) => {
  app.database().ref(`/userData/${uid}/${dataType}`).off()
}
