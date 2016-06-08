import { expect } from 'chai'
import { fromJS } from 'immutable'
import auth from '../../src/reducer/auth'
import { LOG_OUT, REQUEST_AUTH, RECIEVE_AUTH, ERROR_AUTH } from '../../src/constants/actionTypes'
import { AUTH_IN_PROGRESS, AUTH_SUCESS, AUTH_ERROR } from '../../src/constants/authStatus.js'

describe('Auth reducer', () => {
  it('Should return initial state', () => {
    expect(auth(undefined, {})).to.equal(fromJS({}))
  })
  it('Should return state for empty action', () => {
    const initialState = fromJS({
      authStatus: REQUEST_AUTH
    })
    expect(auth(initialState, {})).to.equal(initialState)
  })
  describe('REQUEST_AUTH', () => {
    it('Should handle REQUEST_AUTH action with empty state', () => {
      const action = { type: REQUEST_AUTH }
      const nextState = fromJS({ authStatus: AUTH_IN_PROGRESS })
      expect(auth(undefined, action)).to.equal(nextState)
    })
    it('Should handle REQUEST_AUTH action with non empty state', () => {
      const initialState = fromJS({
        authStatus: AUTH_ERROR,
        errorMesage: 'Wrong redirect link'
      })
      const action = { type: REQUEST_AUTH }
      const nextState = fromJS({ authStatus: AUTH_IN_PROGRESS })
      expect(auth(initialState, action)).to.equal(nextState)
    })
  })
  describe('RECIEVE_AUTH', () => {
    it('Should handle RECIEVE_AUTH action with empty state', () => {
      const action = {
        type: RECIEVE_AUTH,
        userData: {
          uid: 'hdjfsdlkf6ofndso87f',
          displayName: 'Mr. X'
        }
      }
      const nextState = fromJS({
        authStatus: AUTH_SUCESS,
        uid: 'hdjfsdlkf6ofndso87f',
        userName: 'Mr. X'
      })
      expect(auth(undefined, action)).to.equal(nextState)
    })
    it('Should handle RECIEVE_AUTH action with non empty state', () => {
      const initialState = fromJS({
        authStatus: AUTH_ERROR,
        errorMesage: 'Wrong redirect link'
      })
      const action1 = {
        type: RECIEVE_AUTH,
        userData: {
          uid: 'hdjfsdlkf6ofndso87f',
          displayName: 'Mr. X'
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
          displayName: 'Mr. X',
          photoURL: 'http://facebook.com/dsadlj/sdadasdsad/asdasdasd.jpg'
        }
      }
      const nextState2 = fromJS({
        authStatus: AUTH_SUCESS,
        uid: 'hdjfsdlkf6ofndso87f',
        userName: 'Mr. X',
        userImage: 'http://facebook.com/dsadlj/sdadasdsad/asdasdasd.jpg'
      })
      expect(auth(initialState, action1)).to.equal(nextState1)
      expect(auth(initialState, action2)).to.equal(nextState2)
    })
  })
  describe('ERROR_AUTH', () => {
    it('Should handle ERROR_AUTH action with empty state', () => {
      const action = {
        type: ERROR_AUTH,
        errorMessage: 'Popup was closed by user'
      }
      const nextState = fromJS({
        authStatus: AUTH_ERROR,
        errorMessage: 'Popup was closed by user'
      })
      expect(auth(undefined, action)).to.equal(nextState)
    })
    it('Should handle ERROR_AUTH action with non empty state', () => {
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
      expect(auth(initialState, action)).to.equal(nextState)
    })
  })
  describe('LOG_OUT', () => {
    it('Should handle LOG_OUT action with empty state', () => {
      const action = { type: LOG_OUT }
      const nextState = fromJS({})
      expect(auth(undefined, action)).to.equal(nextState)
    })
    it('Should handle LOG_OUT action with non empty state', () => {
      const initialState = fromJS({
        authStatus: AUTH_ERROR,
        errorMesage: 'Wrong redirect link'
      })
      const action = { type: LOG_OUT }
      const nextState = fromJS({})
      expect(auth(initialState, action)).to.equal(nextState)
    })
  })
})
