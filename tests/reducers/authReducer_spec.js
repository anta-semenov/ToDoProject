import { fromJS } from 'immutable'
import auth from '../../src/reducer/auth'
import { LOG_OUT, REQUEST_AUTH, RECIEVE_AUTH, ERROR_AUTH } from '../../src/constants/actionTypes'
import { AUTH_IN_PROGRESS, AUTH_SUCESS, AUTH_ERROR, AUTH_NONE } from '../../src/constants/authStatus.js'

describe('Auth reducer', () => {
  test('Should return initial state', () => {
    expect(auth(undefined, {})).toEqual(fromJS({}))
  })
  test('Should return state for empty action', () => {
    const initialState = fromJS({
      authStatus: REQUEST_AUTH
    })
    expect(auth(initialState, {})).toEqual(initialState)
  })
  describe('REQUEST_AUTH', () => {
    test('Should handle REQUEST_AUTH action with empty state', () => {
      const action = { type: REQUEST_AUTH }
      const nextState = fromJS({ authStatus: AUTH_IN_PROGRESS })
      expect(auth(undefined, action)).toEqual(nextState)
    })
    test('Should handle REQUEST_AUTH action with non empty state', () => {
      const initialState = fromJS({
        authStatus: AUTH_ERROR,
        errorMesage: 'Wrong redirect link'
      })
      const action = { type: REQUEST_AUTH }
      const nextState = fromJS({ authStatus: AUTH_IN_PROGRESS })
      expect(auth(initialState, action)).toEqual(nextState)
    })
  })
  describe('RECIEVE_AUTH', () => {
    test('Should handle RECIEVE_AUTH action with empty state', () => {
      const action = {
        type: RECIEVE_AUTH,
        userData: {
          uid: 'hdjfsdlkf6ofndso87f',
          providerData: [{
            displayName: 'Mr. X'
          }]
        }
      }
      const nextState = fromJS({
        authStatus: AUTH_SUCESS,
        uid: 'hdjfsdlkf6ofndso87f',
        userName: 'Mr. X'
      })
      expect(auth(undefined, action)).toEqual(nextState)
    })
    test('Should handle RECIEVE_AUTH action with non empty state', () => {
      const initialState = fromJS({
        authStatus: AUTH_ERROR,
        errorMesage: 'Wrong redirect link'
      })
      const action1 = {
        type: RECIEVE_AUTH,
        userData: {
          uid: 'hdjfsdlkf6ofndso87f',
          providerData: [{
            displayName: 'Mr. X'
          }]
        }
      }
      const nextState1 = fromJS({
        authStatus: AUTH_SUCESS,
        uid: 'hdjfsdlkf6ofndso87f',
        userName: 'Mr. X'
      })
      const action2 = {
        type: RECIEVE_AUTH,
        userData: {
          uid: 'hdjfsdlkf6ofndso87f',
          providerData: [{
            displayName: 'Mr. X',
            photoURL: 'http://facebook.com/dsadlj/sdadasdsad/asdasdasd.jpg'
          }]
        }
      }
      const nextState2 = fromJS({
        authStatus: AUTH_SUCESS,
        uid: 'hdjfsdlkf6ofndso87f',
        userName: 'Mr. X',
        userImage: 'http://facebook.com/dsadlj/sdadasdsad/asdasdasd.jpg'
      })
      expect(auth(initialState, action1)).toEqual(nextState1)
      expect(auth(initialState, action2)).toEqual(nextState2)
    })
  })
  describe('ERROR_AUTH', () => {
    test('Should handle ERROR_AUTH action with empty state', () => {
      const action = {
        type: ERROR_AUTH,
        errorMessage: 'Popup was closed by user'
      }
      const nextState = fromJS({
        authStatus: AUTH_ERROR,
        errorMessage: 'Popup was closed by user'
      })
      expect(auth(undefined, action)).toEqual(nextState)
    })
    test('Should handle ERROR_AUTH action with non empty state', () => {
      const initialState = fromJS({
        authStatus: AUTH_SUCESS,
        uid: 'hdjfsdlkf6ofndso87f',
        userName: 'Mr. X'
      })
      const action = {
        type: ERROR_AUTH,
        errorMessage: 'Popup was closed by user'
      }
      const nextState = fromJS({
        authStatus: AUTH_ERROR,
        errorMessage: 'Popup was closed by user'
      })
      expect(auth(initialState, action)).toEqual(nextState)
    })
  })
  describe('LOG_OUT', () => {
    test('Should handle LOG_OUT action with empty state', () => {
      const action = { type: LOG_OUT }
      const nextState = fromJS({ authStatus: AUTH_NONE })
      expect(auth(undefined, action)).toEqual(nextState)
    })
    test('Should handle LOG_OUT action with non empty state', () => {
      const initialState = fromJS({
        authStatus: AUTH_ERROR,
        errorMesage: 'Wrong redirect link'
      })
      const action = { type: LOG_OUT }
      const nextState = fromJS({ authStatus: AUTH_NONE })
      expect(auth(initialState, action)).toEqual(nextState)
    })
  })
})
